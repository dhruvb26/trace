import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

interface MCPConnection {
  client: Client
  transport: StdioClientTransport
  tools: any[]
  lastUsed: Date
  serverUrl: string
}

const mcpConnections = new Map<string, MCPConnection>()

export async function POST(request: NextRequest) {
  try {
    const { serverUrl, message, connectionId } = await request.json()

    if (!serverUrl && !connectionId) {
      return NextResponse.json(
        { error: 'Either serverUrl or connectionId is required' },
        { status: 400 }
      )
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    let connection = connectionId ? mcpConnections.get(connectionId) : undefined

    if (!connection) {
      if (!serverUrl) {
        return NextResponse.json(
          { error: 'Server URL is required for initial connection' },
          { status: 400 }
        )
      }

      const newConnectionId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

      try {
        const client = new Client({
          name: 'rector-mcp-client',
          version: '1.1.0',
          protocolVersion: '2025-03-26',
        })

        const transport = new StdioClientTransport({
          command: '/Users/dhruv/.local/bin/uv',
          args: [
            '--directory',
            '/Users/dhruv/Desktop/hub/mcp-servers',
            'run',
            'documents.py',
          ],
        })

        client.connect(transport)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const toolsResult = await client.listTools()
        const tools = toolsResult.tools.map(
          ({ name, description, inputSchema }) => ({
            name,
            description,
            input_schema: inputSchema,
          })
        )

        connection = {
          client,
          transport,
          tools,
          lastUsed: new Date(),
          serverUrl,
        }
        mcpConnections.set(newConnectionId, connection)

        const responseText = await processMessage(message, connection)
        return NextResponse.json({
          connectionId: newConnectionId,
          tools,
          response: responseText,
        })
      } catch (error) {
        console.error('Failed to connect to MCP server:', error)
        return NextResponse.json(
          { error: `Failed to connect to MCP server: ${error}` },
          { status: 500 }
        )
      }
    }

    connection.lastUsed = new Date()
    const responseText = await processMessage(message, connection)
    return NextResponse.json({ connectionId, response: responseText })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function processMessage(message: string, connection: MCPConnection) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey)
      throw new Error('GOOGLE_API_KEY environment variable is not set')

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-preview-04-17',
      tools: connection.tools.map((tool) => ({
        functionDeclarations: [
          {
            name: tool.name,
            description: tool.description,
            parameters: tool.input_schema,
          },
        ],
      })),
    })

    const chat = model.startChat()
    const finalText: string[] = []
    let currentResponse = await chat.sendMessage(message)

    while (true) {
      let hasToolUse = false
      const response = currentResponse.response

      if (response.candidates?.[0]) {
        for (const part of response.candidates[0].content.parts) {
          if ('text' in part && typeof part.text === 'string') {
            finalText.push(part.text)
          } else if ('functionCall' in part && part.functionCall?.name) {
            hasToolUse = true
            const { name: toolName, args: toolArgs } = part.functionCall

            try {
              const result = await connection.client.callTool({
                name: toolName,
                arguments: toolArgs as Record<string, unknown>,
              })

              let resultContent =
                typeof result.content === 'object'
                  ? JSON.stringify(result.content)
                  : String(result.content)

              try {
                const parsedContent = JSON.parse(resultContent)
                if (Array.isArray(parsedContent) && parsedContent[0]?.text) {
                  resultContent = parsedContent[0].text
                }
              } catch (e) {
                // If parsing fails, use the original content
              }

              // Send the tool result to the model but don't add it to finalText
              currentResponse = await chat.sendMessage([
                {
                  functionResponse: {
                    name: toolName,
                    response: { name: toolName, content: resultContent },
                  },
                },
              ])
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : String(error)
              console.error('Error calling tool:', errorMessage)

              currentResponse = await chat.sendMessage([
                {
                  functionResponse: {
                    name: toolName,
                    response: {
                      name: toolName,
                      content: `Error: ${errorMessage}`,
                    },
                  },
                },
              ])
            }
          }
        }
      }

      if (!hasToolUse) break
    }

    return finalText.join('\n')
  } catch (error) {
    if (error instanceof Error && error.message.includes('403 Forbidden')) {
      throw new Error(
        'Invalid or unauthorized Google API key. Please check your API key configuration.'
      )
    }
    throw error
  }
}

export async function GET(request: NextRequest) {
  const connectionId = request.nextUrl.searchParams.get('connectionId')
  if (!connectionId)
    return NextResponse.json(
      { error: 'Connection ID is required' },
      { status: 400 }
    )

  const connection = mcpConnections.get(connectionId)
  if (!connection)
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 })

  connection.lastUsed = new Date()
  return NextResponse.json({
    connected: true,
    toolCount: connection.tools.length,
  })
}
