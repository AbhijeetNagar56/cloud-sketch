import ReactFlow, {
  ReactFlowProvider,
  Handle,
  Position,
  MarkerType,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
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
} from 'lucide-react';

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

const HANDLES = [
  ['top', Position.Top],
  ['right', Position.Right],
  ['bottom', Position.Bottom],
  ['left', Position.Left],
];

const iconBox = 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[color:var(--c)]';

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

/* ---------- Canvas ---------- */
function Canvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans text-slate-900">
      <div className="relative min-w-0 flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        />
      </div>
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
