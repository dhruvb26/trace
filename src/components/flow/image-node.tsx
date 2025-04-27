'use client'

import React from 'react'
import Image from 'next/image'
import { Handle, Position } from '@xyflow/react'

interface ImageNodeProps {
  data: {
    image: string
  }
}

export const ImageNode: React.FC<ImageNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        padding: '0px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid var(--color-border)',
        position: 'relative',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Right}
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        isConnectable={true}
      />

      <Image
        className="rounded-md"
        src={data.image}
        alt="Node Image"
        width={250}
        height={250}
        style={{ objectFit: 'fill' }}
      />
    </div>
  )
}

export default ImageNode
