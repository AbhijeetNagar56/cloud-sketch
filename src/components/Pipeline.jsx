import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Panel,
  Handle,
  Position,
  MarkerType,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  getRectOfNodes,
  getTransformForBounds,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';
import {
  GitBranch,
  Hammer,
  FlaskConical,
  ListChecks,
  ShieldCheck,
  Container,
  Package,
  Rocket,
  Activity,
  Bell,
  Download,
  Trash2,
  ArrowLeft,
  Save,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router';

/* ---------- Stage catalog (sidebar items + per-node dropdown options) ---------- */
const CATALOG = {
  git: { label: 'Source Code', icon: GitBranch, color: '#f05032', options: ['GitHub', 'GitLab', 'Bitbucket'] },
  build: { label: 'Build', icon: Hammer, color: '#d97706', options: ['npm', 'Maven', 'Gradle', 'pip', 'Go build'] },
  test: { label: 'Test', icon: FlaskConical, color: '#16a34a', options: ['Jest', 'PyTest', 'JUnit', 'Cypress'] },
  quality: { label: 'Code Quality', icon: ListChecks, color: '#0e7490', options: ['ESLint', 'SonarQube', 'Prettier'] },
  security: { label: 'Security Scan', icon: ShieldCheck, color: '#b91c1c', options: ['Snyk', 'Trivy', 'OWASP ZAP'] },
  docker: { label: 'Docker Image', icon: Container, color: '#0ea5e9', options: ['Docker', 'Podman', 'Buildpacks'] },
  registry: { label: 'Registry', icon: Package, color: '#9333ea', options: ['Docker Hub', 'AWS ECR', 'GitHub Packages'] },
  deploy: { label: 'Deploy', icon: Rocket, color: '#c2410c', options: ['Vercel', 'Netlify', 'Kubernetes', 'AWS ECS'] },
  monitoring: { label: 'Monitoring', icon: Activity, color: '#65a30d', options: ['Prometheus', 'Grafana', 'Datadog'] },
  notify: { label: 'Notify', icon: Bell, color: '#e11d48', options: ['Slack', 'Email', 'Discord'] },
};

const DRAG_TYPE = 'application/cloudsketch';
const HANDLES = [
  ['top', Position.Top],
  ['right', Position.Right],
  ['bottom', Position.Bottom],
  ['left', Position.Left],
];

/* Shared Tailwind class strings */
const btn =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';
const btnPrimary = `${btn} border-blue-600 bg-blue-600 text-white hover:bg-blue-700`;
const btnGhost = `${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100`;
const iconBox = 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[color:var(--c)]';

/* Saved pipelines live in their own list, separate from architecture diagrams (Saved.jsx reads both) */
const PIPELINE_KEY = 'cloudsketch:pipelines';

const readPipelines = () => {
  try {
    return JSON.parse(localStorage.getItem(PIPELINE_KEY)) || [];
  } catch {
    return [];
  }
};

/* ---------- Custom node ---------- */
function StageNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();
  const meta = CATALOG[data.kind];
  const Icon = meta.icon;

  const update = (patch) =>
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n)));

  return (
    <div
      style={{ '--c': meta.color }}
      className={`min-w-[176px] rounded-xl border-[1.5px] border-[color:var(--c)] bg-white p-2.5 shadow-md ${
        selected ? 'ring-2 ring-[color:var(--c)] ring-offset-2' : ''
      }`}
    >
      {HANDLES.map(([hid, pos]) => (
        <Handle
          key={hid}
          id={hid}
          type="source"
          position={pos}
          className="!h-2.5 !w-2.5 !border-2 !border-white !bg-[color:var(--c)]"
        />
      ))}
      <div className="flex items-center gap-2">
        <span className={iconBox}>
          <Icon size={16} color="#fff" />
        </span>
        <input
          className="nodrag w-[116px] rounded-md border border-transparent bg-transparent px-1 py-[3px] text-[13px] font-semibold text-slate-900 hover:border-slate-300 hover:bg-white focus:border-slate-300 focus:bg-white focus:outline-none"
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
          aria-label="Stage name"
        />
      </div>
      <select
        className="nodrag mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-1.5 py-[5px] text-[12.5px] text-slate-900"
        value={data.option}
        onChange={(e) => update({ option: e.target.value })}
        aria-label={`${meta.label} tool`}
      >
        {meta.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

const nodeTypes = { stage: StageNode };

const makeNode = (id, kind, position) => ({
  id,
  type: 'stage',
  position,
  data: { kind, name: CATALOG[kind].label, option: CATALOG[kind].options[0] },
});

const initialNodes = [
  makeNode('1', 'git', { x: 0, y: 120 }),
  makeNode('2', 'build', { x: 260, y: 120 }),
  makeNode('3', 'test', { x: 520, y: 120 }),
  makeNode('4', 'deploy', { x: 780, y: 120 }),
  makeNode('5', 'notify', { x: 1040, y: 120 }),
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e4-5', source: '4', target: '5', sourceHandle: 'right', targetHandle: 'left' },
];

const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#64748b', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
};

/* ---------- Sidebar ---------- */
function Sidebar({ onAdd }) {
  return (
    <aside className="w-[200px] shrink-0 overflow-y-auto border-l border-slate-200 bg-white px-4 py-[18px] md:w-[268px]">
      <h2 className="mb-0.5 text-base font-semibold">Pipeline stages</h2>
      <p className="mb-3.5 text-[12.5px] leading-snug text-slate-500">Drag onto the canvas, or click to add.</p>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {Object.entries(CATALOG).map(([kind, meta]) => {
          const Icon = meta.icon;
          return (
            <div
              key={kind}
              style={{ '--c': meta.color }}
              className="flex cursor-grab select-none flex-col items-center gap-[7px] rounded-xl border border-slate-200 bg-slate-50 px-1.5 py-3 text-center text-xs font-semibold hover:border-[color:var(--c)] hover:bg-white active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              draggable
              role="button"
              tabIndex={0}
              aria-label={`Add ${meta.label} stage`}
              onDragStart={(e) => {
                e.dataTransfer.setData(DRAG_TYPE, kind);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onClick={() => onAdd(kind)}
              onKeyDown={(e) => e.key === 'Enter' && onAdd(kind)}
            >
              <span className={iconBox}>
                <Icon size={18} color="#fff" />
              </span>
              {meta.label}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-[12.5px] leading-snug text-slate-500">
        Connect stages by dragging from one dot to another. Select a stage or arrow and press Backspace or Delete to
        remove it.
      </p>
    </aside>
  );
}

/* ---------- Canvas ---------- */
function Canvas() {
  // Opened from the Saved page as /pipeline?project=<id>? Then start from that pipeline instead of the sample.
  const [params] = useSearchParams();
  const [opened] = useState(() => readPipelines().find((p) => p.id === params.get('project')));

  const [nodes, setNodes, onNodesChange] = useNodesState(opened ? opened.nodes : initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(opened ? opened.edges : initialEdges);
  const [name, setName] = useState(opened ? opened.name : '');
  const [projectId, setProjectId] = useState(opened ? opened.id : null);
  const [justSaved, setJustSaved] = useState(false);
  const wrapper = useRef(null);
  const nextId = useRef(100);
  const rf = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback(
    (kind, position) => {
      const pos =
        position ||
        (() => {
          const b = wrapper.current.getBoundingClientRect();
          const jitter = (nextId.current % 5) * 24;
          return rf.screenToFlowPosition
            ? rf.screenToFlowPosition({ x: b.left + b.width / 2 + jitter, y: b.top + b.height / 2 + jitter })
            : rf.project({ x: b.width / 2 + jitter, y: b.height / 2 + jitter });
        })();
      // time + counter, so a new id never clashes with an id inside an opened saved pipeline
      setNodes((nds) => nds.concat(makeNode(`n${Date.now()}-${nextId.current++}`, kind, pos)));
    },
    [rf, setNodes]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const kind = e.dataTransfer.getData(DRAG_TYPE);
      if (!CATALOG[kind]) return;
      const raw = { x: e.clientX, y: e.clientY };
      const bounds = wrapper.current.getBoundingClientRect();
      const pos = rf.screenToFlowPosition
        ? rf.screenToFlowPosition(raw)
        : rf.project({ x: raw.x - bounds.left, y: raw.y - bounds.top });
      addNode(kind, { x: pos.x - 85, y: pos.y - 30 });
    },
    [rf, addNode]
  );

  const exportPng = () => {
    if (!nodes.length) return;
    const width = 1600;
    const height = 1000;
    const rect = getRectOfNodes(nodes);
    const [x, y, zoom] = getTransformForBounds(rect, width, height, 0.5, 2);
    const fileName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'cloudsketch-pipeline';
    toPng(wrapper.current.querySelector('.react-flow__viewport'), {
      backgroundColor: '#f8fafc',
      width,
      height,
      style: { width: `${width}px`, height: `${height}px`, transform: `translate(${x}px, ${y}px) scale(${zoom})` },
    }).then((url) => {
      const a = document.createElement('a');
      a.download = `${fileName}.png`;
      a.href = url;
      a.click();
    });
  };

  const clearAll = () => {
    if (!window.confirm('Remove every stage from the canvas?')) return;
    setNodes([]);
    setEdges([]);
  };

  const savePipeline = () => {
    const pipelineId = projectId || `pl${Date.now()}`;
    const pipeline = {
      id: pipelineId,
      type: 'pipeline',
      name: name.trim() || 'Untitled pipeline',
      updatedAt: Date.now(),
      // keep only what is needed to draw it again
      nodes: nodes.map(({ id, type, position, data }) => ({ id, type, position, data })),
      edges: edges.map(({ id, source, target, sourceHandle, targetHandle }) => ({ id, source, target, sourceHandle, targetHandle })),
    };
    // replace the old copy of this pipeline (if any) and put it first
    const list = [pipeline, ...readPipelines().filter((p) => p.id !== pipelineId)];
    try {
      localStorage.setItem(PIPELINE_KEY, JSON.stringify(list));
    } catch {
      alert('Could not save: browser storage is full.');
      return;
    }
    setProjectId(pipelineId);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans text-slate-900">
      <div className="relative min-w-0 flex-1" ref={wrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={defaultEdgeOptions}
          deleteKeyCode={['Backspace', 'Delete']}
          fitView
        >
          <Panel position="top-left" className="flex items-center gap-2">
            <Link to="/" className={`${btnGhost} no-underline`} aria-label="Back to home">
              <ArrowLeft size={15} />
            </Link>
            <div className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5">
              <input
                className="w-44 bg-transparent text-[13px] font-semibold text-slate-900 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Pipeline name"
                aria-label="Pipeline name"
              />
            </div>
          </Panel>

          <Panel position="top-right" className="flex gap-2">
            <button className={btnPrimary} onClick={savePipeline}>
              <Save size={15} /> {justSaved ? 'Saved!' : 'Save'}
            </button>
            <button className={btnPrimary} onClick={exportPng}>
              <Download size={15} /> Export PNG
            </button>
            <button className={btnGhost} onClick={clearAll}>
              <Trash2 size={15} /> Clear
            </button>
          </Panel>

          <MiniMap pannable zoomable />
          <Controls />
          <Background gap={20} />
        </ReactFlow>
      </div>
      <Sidebar onAdd={(kind) => addNode(kind)} />
    </div>
  );
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
