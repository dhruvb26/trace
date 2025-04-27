import ImageNode from '@/components/flow/image-node';
import DefaultNode from '@/components/flow/default-node';
import CustomEdge from '@/components/flow/custom-edge';
import { 
  BezierEdge,
  StraightEdge,
  StepEdge,
  SmoothStepEdge
} from '@xyflow/react';

export const nodeTypes = {
  "image-node": ImageNode,
  "default-node": DefaultNode,
};

export const edgeTypes = {
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
  custom: CustomEdge
};
