'use client'

import React, { useCallback, useState } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  XYPosition,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nodeTypes, edgeTypes } from '@/types/flow'
import { initialNodes, initialEdges } from '@/utils/flow-config'

export default function DefaultFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodePosition, setNodePosition] = useState<XYPosition | null>(null)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeDrag = useCallback(
    (_: any, node: Node) => {
      if (selectedNode && selectedNode.id === node.id) {
        setNodePosition({
          x: Math.round(node.position.x),
          y: Math.round(node.position.y),
        })
      }
    },
    [selectedNode]
  )

  const onSelectionChange = useCallback((params: { nodes: Node[] }) => {
    if (params.nodes.length === 1) {
      const node = params.nodes[0]
      setSelectedNode(node)
      setNodePosition({
        x: Math.round(node.position.x),
        y: Math.round(node.position.y),
      })
    } else {
      setSelectedNode(null)
      setNodePosition(null)
    }
  }, [])

  return (
    <div className="w-full h-full rounded-md relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.4}
        maxZoom={0.8}
        proOptions={{
          hideAttribution: true,
        }}
      />
      {nodePosition && selectedNode && (
        <div className="absolute bottom-4 left-4 bg-lime-100 text-lime-800 border border-lime-300 rounded-md p-2 font-mono text-sm">
          <p>x: {nodePosition.x}</p>
          <p>y: {nodePosition.y}</p>
        </div>
      )}
    </div>
  )
}
