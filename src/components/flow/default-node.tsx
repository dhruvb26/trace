import React from 'react'
import { Handle, Position } from '@xyflow/react'

interface DefaultNodeProps {
  data: {
    title: string
    description?: string
  }
}

const DefaultNode: React.FC<DefaultNodeProps> = ({ data }) => {
  const { title, description } = data

  return (
    <div
      style={{
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #65a30d',
        backgroundColor: '#ffffff',
        minWidth: '150px',
        maxWidth: '300px',
        position: 'relative',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555' }}
      />

      <div style={{ marginBottom: description ? '8px' : '0' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 600,
            color: '#333',
          }}
        >
          {title}
        </h3>
      </div>

      {description && (
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: '#666',
            }}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  )
}

export default DefaultNode
