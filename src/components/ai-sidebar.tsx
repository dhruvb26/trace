'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from './ui/button'
import { ArrowUp } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { Loader } from '@/components/loader'
import { ThinkingIndicator } from '@/components/thinking-indicator'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AISidebar({ mcpServerUrl }: { mcpServerUrl: string }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [connectionId, setConnectionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const connectToServer = async () => {
      if (!mcpServerUrl) return

      try {
        setConnectionError(null)
        setIsLoading(true)

        if (connectionId) {
          const response = await fetch(`/api/mcp?connectionId=${connectionId}`)
          if (response.ok) {
            setIsConnected(true)
            setIsLoading(false)
            return
          }
        }

        const result = await sendMessage('Hello', true)
        if (result.success) {
          setConnectionId(result.connectionId || null)
          setIsConnected(true)
        } else {
          setConnectionError(result.error || null)
        }
      } catch (error) {
        console.error('Connection error:', error)
        setConnectionError('Failed to connect to server')
      } finally {
        setIsLoading(false)
      }
    }

    connectToServer()
  }, [mcpServerUrl])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (
    message: string,
    isInitial = false
  ): Promise<{
    success: boolean
    connectionId?: string
    response?: string
    error?: string
  }> => {
    try {
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serverUrl: !connectionId ? mcpServerUrl : undefined,
          connectionId,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to communicate with server',
        }
      }

      return {
        success: true,
        connectionId: data.connectionId,
        response: data.response,
      }
    } catch (error) {
      console.error('Error sending message:', error)
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !isConnected) return

    const userMessage = input
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsLoading(true)

    try {
      const result = await sendMessage(userMessage)

      if (result.success && result.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: result.response || '' },
        ])

        if (result.connectionId && result.connectionId !== connectionId) {
          setConnectionId(result.connectionId)
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: result.error || 'Failed to get a response',
          },
        ])

        if (result.error?.includes('Connection not found')) {
          setConnectionId(null)
          setIsConnected(false)
        }
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'An error occurred while processing your request.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed justify-end right-4 top-4 flex flex-col gap-4 h-[calc(100vh-2rem)] w-[400px] z-50">
      <div className="flex-1 rounded-md border bg-background p-4 flex flex-col h-full">
        <div className="flex-1 overflow-auto space-y-4">
          {messages.length === 0 ? (
            <div className="h-[95%] flex flex-col justify-center items-center">
              {!isConnected ? (
                <Loader />
              ) : (
                <div className="text-center p-4">
                  <Image
                    src="/logos/icon.png"
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-md text-sm ${
                  message.role === 'user'
                    ? 'bg-lime-300 ml-auto max-w-fit'
                    : 'mr-auto max-w-[80%]'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && messages.length > 0 && <ThinkingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="rounded-md bg-background mt-4">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              placeholder="Tell us your query"
              className="w-full min-h-[90px] p-4 resize-none shadow-none"
              disabled={!isConnected || isLoading}
            />
            <Button
              variant="outline"
              className="absolute right-4 bottom-4 shadow-none cursor-pointer w-8 h-8"
              type="submit"
              size="icon"
              disabled={!isConnected || isLoading || !input.trim()}
            >
              <ArrowUp size={24} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
