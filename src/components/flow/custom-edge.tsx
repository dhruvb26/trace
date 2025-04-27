import React from 'react'
import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
} from '@xyflow/react'

interface CustomEdgeData {
  label?: string
  edgeType?: 'bezier' | 'straight' | 'smoothstep'
  animate?: boolean
}

type CustomEdgeProps = EdgeProps & {
  data?: CustomEdgeData
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style,
}) => {
  const getPath = (type?: string) => {
    const params = {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    }

    switch (type) {
      case 'straight':
        return getStraightPath(params)
      case 'smoothstep':
        return getSmoothStepPath(params)
      case 'bezier':
      default:
        return getBezierPath(params)
    }
  }

  const { label, edgeType, animate } = data || {}
  const [edgePath, labelX, labelY] = getPath(edgeType)

  const edgeStyle = {
    stroke: '#888',
    strokeWidth: 2,
    strokeDasharray: animate ? '5,5' : 'none',
    animation: animate ? 'flow 1s linear infinite' : 'none',
    ...(style as React.CSSProperties),
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={edgeStyle} />
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{
            fill: '#888',
            fontSize: '12px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {label}
        </text>
      )}
      <style jsx global>{`
        @keyframes flow {
          from {
            stroke-dashoffset: 10;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  )
}

export default CustomEdge
