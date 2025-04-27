import { Node, Edge } from '@xyflow/react'

interface NodeData {
  title?: string
  description?: string
  image?: string
  [key: string]: unknown
}

interface EdgeData {
  label?: string
  edgeType: 'bezier' | 'smoothstep' | 'straight'
  animate?: boolean
  [key: string]: unknown
}

export const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'default-node',
    position: { x: -300, y: -40 },
    data: {
      title: 'Raw Materials Sourcing',
      description:
        'Sourcing recycled polyester from post-consumer plastic bottles and factory scraps since 1993. Materials are certified to Recycled Claim Standard (RCS) and Global Recycled Standard (GRS) to ensure traceable supply chains.',
    },
  },
  {
    id: '2',
    type: 'default-node',
    position: { x: 10, y: 200 },
    data: {
      title: 'Material Processing',
      description:
        'Converting raw materials into fabric using energy-efficient technologies. Includes innovative processes like waterless dyeing and leveraging renewable energy sources to minimize environmental impact.',
    },
  },
  {
    id: '3',
    type: 'default-node',
    position: { x: 400, y: 20 },
    data: {
      title: 'Fabric Treatment',
      description:
        'Applying PFC-free DWR (Durable Water Repellent) treatments that maintain performance while reducing environmental impact. Chemical management follows strict guidelines for worker and environmental safety.',
    },
  },
  {
    id: '4',
    type: 'image-node',
    position: { x: 400, y: 450 },
    data: { image: '/images/jacket.jpg' },
  },
  {
    id: '5',
    type: 'default-node',
    position: { x: 700, y: 250 },
    data: {
      title: 'Pattern Cutting',
      description:
        "Precision cutting of fabric pieces using innovative techniques that maximize material efficiency and minimize waste. Part of Patagonia's commitment to reducing environmental footprint throughout production.",
    },
  },
  {
    id: '6',
    type: 'default-node',
    position: { x: -300, y: 650 },
    data: {
      title: 'Assembly',
      description:
        'Garment production in Fair Trade Certified™ factories that ensure safe working conditions, fair wages, and worker empowerment. Communities benefit through additional premiums that fund local improvement projects.',
    },
  },
  {
    id: '7',
    type: 'default-node',
    position: { x: -400, y: 450 },
    data: {
      title: 'Quality Control',
      description:
        "Rigorous testing for durability, performance, and compliance with Patagonia's Ironclad Guarantee. Products designed for longevity, repairability, and minimal environmental impact throughout their lifecycle.",
    },
  },
  {
    id: '8',
    type: 'default-node',
    position: { x: 100, y: 800 },
    data: {
      title: 'Distribution',
      description:
        "Carbon-neutral shipping and sustainable logistics. Includes the Worn Wear program that extends product lifecycles through repair, resale, and recycling, reinforcing Patagonia's circular economy commitment.",
    },
  },
]

export const initialEdges: Edge<EdgeData>[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'custom',
    data: {
      label: 'Material Flow',
      edgeType: 'bezier',
      animate: true,
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'custom',
    data: {
      edgeType: 'smoothstep',
    },
  },

  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'custom',
    data: {
      edgeType: 'straight',
      animate: true,
    },
  },
  {
    id: 'e5-4',
    source: '5',
    target: '4',
    type: 'custom',
    data: {
      edgeType: 'smoothstep',
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'custom',
    data: {
      label: 'Manufacturing',
      edgeType: 'straight',
      animate: true,
    },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    type: 'custom',
    data: {
      edgeType: 'smoothstep',
    },
  },
  {
    id: 'e7-8',
    source: '7',
    target: '8',
    type: 'custom',
    data: {
      edgeType: 'straight',
    },
  },
  {
    id: 'e7-4',
    source: '7',
    target: '4',
    type: 'custom',
    data: {
      label: 'Final Stage',
      edgeType: 'smoothstep',
      animate: true,
    },
  },
]
