import React from 'react'
import ReactFlow, { ReactFlowProvider, Background, BackgroundVariant, Handle, Position, MarkerType } from 'reactflow'
import 'reactflow/dist/style.css'

import { Monitor, Network, Server, Database, HardDrive } from 'lucide-react'

const components = {
  frontend: {
    label: 'Frontend',
    technology: 'React',
    icon: Monitor,
    color: '#2563eb',
    background: '#eff6ff',
  },
  loadbalancer: {
    label: 'Load Balancer',
    technology: 'NGINX',
    icon: Network,
    color: '#0891b2',
    background: '#ecfeff',
  },
  backend: {
    label: 'Backend',
    technology: 'Node.js',
    icon: Server,
    color: '#059669',
    background: '#ecfdf5',
  },
  database: {
    label: 'Database',
    technology: 'PostgreSQL',
    icon: Database,
    color: '#7c3aed',
    background: '#f5f3ff',
  },
  bucket: {
    label: 'Storage Bucket',
    technology: 'AWS S3',
    icon: HardDrive,
    color: '#ea580c',
    background: '#fff7ed',
  },
}

function PreviewNode({ data }) {
  const ComponentIcon = data.icon

  return (
    <div
      className="relative flex w-[145px] items-center gap-2 rounded-lg border bg-white p-2 shadow-sm"
      style={{ borderColor: data.color }}
    >

      {/* Incoming connection point */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-2 !w-2 !border-0 !bg-slate-400"
      />

      <div
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md"
        style={{
          backgroundColor: data.background,
          color: data.color,
        }}
      >
        <ComponentIcon size={17} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-slate-900">
          {data.label}
        </p>
        <p className="truncate text-[11px] text-slate-500">
          {data.technology}
        </p>
      </div>

      {/* Outgoing connection point */}
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2 !w-2 !border-0 !bg-slate-400"
      />

    </div>
  )
}

const nodeTypes = { preview: PreviewNode }

const makeNode = (id, type, position) => ({
  id,
  type: 'preview',
  position,
  data: components[type],
})

const initialNodes = [
  makeNode('1', 'frontend', { x: 0, y: 120 }),
  makeNode('2', 'loadbalancer', { x: 260, y: 120 }),
  makeNode('3', 'backend', { x: 520, y: 120 }),
  makeNode('4', 'database', { x: 780, y: 40 }),
  makeNode('5', 'bucket', { x: 780, y: 220 }),
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#64748b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#64748b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#64748b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#64748b', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' } },
]

function PreviewCanvas() {
  return (
    <section className="mx-auto mt-12 w-auto px-4 pb-12">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="h-[290px] w-full bg-slate-50 sm:h-[320px]">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            zoomOnDoubleClick={false}
            panOnDrag={false}
            preventScrolling
            fitView
            fitViewOptions={{ padding: 0.12, maxZoom: 0.5 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={16}
              size={1}
              color="#cbd5e1"
            />
          </ReactFlow>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-500">
            Preview Example Designed with CloudSketch
          </p>
          <p className="text-xs text-slate-500">
            5 components · 4 connections
          </p>
        </div>
      </div>
    </section>
  )
}


export default function ArchitecturePreview() {
  return (
    <ReactFlowProvider>
      <PreviewCanvas />
    </ReactFlowProvider>
  )
}
