import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Copy, Pencil, Search, Trash2 } from 'lucide-react';

/* Must match the values used in Architecture.jsx */
const STORE_KEY = 'cloudsketch:projects';
const DRAFT_KEY = 'cloudsketch:draft';
const HOME_PATH = '/';
const EDITOR_PATH = '/architecture'; // change to your editor route
const NODE_W = 176;
const NODE_H = 84;

const KIND_COLORS = {
  frontend: '#2563eb',
  backend: '#059669',
  database: '#7c3aed',
  bucket: '#ea580c',
  loadbalancer: '#0891b2',
  cache: '#ca8a04',
  queue: '#db2777',
  cdn: '#0d9488',
  gateway: '#4f46e5',
  auth: '#dc2626',
};

const btn =
  'inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-semibold no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';
const btnPrimary = `${btn} border-blue-600 bg-blue-600 text-white hover:bg-blue-700`;
const btnGhost = `${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100`;

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const formatTime = (t) => new Date(t).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

/* Small schematic of the saved diagram */
function Preview({ nodes, edges }) {
  if (!nodes.length) {
    return <div className="grid h-36 place-items-center text-xs text-slate-400">Empty diagram</div>;
  }
  const pad = 24;
  const xs = nodes.map((n) => n.position.x);
  const ys = nodes.map((n) => n.position.y);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) + NODE_W + pad - minX;
  const h = Math.max(...ys) + NODE_H + pad - minY;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox={`${minX} ${minY} ${w} ${h}`} className="h-36 w-full" role="img" aria-label="Diagram preview">
      {edges.map((e) => {
        const a = byId[e.source];
        const b = byId[e.target];
        if (!a || !b) return null;
        return (
          <line
            key={e.id}
            x1={a.position.x + NODE_W / 2}
            y1={a.position.y + NODE_H / 2}
            x2={b.position.x + NODE_W / 2}
            y2={b.position.y + NODE_H / 2}
            stroke="#94a3b8"
            strokeWidth="4"
          />
        );
      })}
      {nodes.map((n) => {
        const c = KIND_COLORS[n.data?.kind] || '#64748b';
        const { x, y } = n.position;
        return (
          <g key={n.id}>
            <rect x={x} y={y} width={NODE_W} height={NODE_H} rx="14" fill="#fff" stroke={c} strokeWidth="5" />
            <rect x={x + 16} y={y + NODE_H / 2 - 16} width="32" height="32" rx="8" fill={c} />
            <rect x={x + 60} y={y + NODE_H / 2 - 7} width="92" height="14" rx="7" fill="#cbd5e1" />
          </g>
        );
      })}
    </svg>
  );
}

const stackOf = (p) =>
  [...new Set(p.nodes.map((n) => n.data?.option).filter(Boolean))].slice(0, 4).join(' · ');

const Saved = () => {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setProjects(read(STORE_KEY, []));
    setLoaded(true);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...projects]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((p) => !q || `${p.name} ${stackOf(p)}`.toLowerCase().includes(q));
  }, [projects, query]);

  const persist = (list) => {
    if (!write(STORE_KEY, list)) {
      alert('Could not update saved projects: browser storage is full.');
      return false;
    }
    setProjects(list);
    return true;
  };

  const duplicate = (p) => {
    const copy = { ...p, id: `p${Date.now()}`, name: `${p.name} (copy)`, updatedAt: Date.now() };
    persist([copy, ...projects]);
  };

  const remove = (p) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    if (!persist(projects.filter((x) => x.id !== p.id))) return;
    const d = read(DRAFT_KEY, null);
    if (d && d.currentId === p.id) write(DRAFT_KEY, { ...d, currentId: null, savedSig: '' });
  };

  const rename = (p) => {
    const next = window.prompt('Rename project', p.name);
    if (!next || !next.trim() || next.trim() === p.name) return;
    const newName = next.trim();
    if (!persist(projects.map((x) => (x.id === p.id ? { ...x, name: newName } : x)))) return;
    const d = read(DRAFT_KEY, null);
    if (d && d.currentId === p.id) {
      try {
        const snapshot = JSON.parse(d.savedSig);
        snapshot[1] = newName;
        const sameName = (d.name || '').trim() === p.name;
        write(DRAFT_KEY, { ...d, name: sameName ? newName : d.name, savedSig: JSON.stringify(snapshot) });
      } catch {
        /* draft has no valid snapshot */
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex w-full flex-wrap items-center gap-3 px-6 py-4">
          <Link to={HOME_PATH} className={btnGhost}>
            <ArrowLeft size={15} />
          </Link>
          <div className="mr-auto">
            <h1 className="text-xl font-bold leading-tight tracking-tight">Saved projects</h1>
            <p className="text-[12.5px] text-slate-500">
              {loaded ? `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}` : 'Loading...'} · stored in this browser
            </p>
          </div>
          <label className="relative">
            <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search saved projects"
              className="w-56 rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-[13px] focus:border-blue-600 focus:outline-none"
            />
          </label>
        </div>
      </header>

      <main className="w-full px-6 py-6">
        {loaded && projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-base font-semibold">No saved projects yet</p>
            <p className="mx-auto mt-1 max-w-sm text-[13px] text-slate-500">
              Build a diagram in the editor and press Save.
            </p>
          </div>
        )}

        {projects.length > 0 && visible.length === 0 && (
          <p className="py-12 text-center text-[13px] text-slate-500">No projects match "{query}".</p>
        )}

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <Link to={`${EDITOR_PATH}?project=${p.id}`} className="block border-b border-slate-200 bg-slate-50 p-3" aria-label={`Open ${p.name}`}>
                <Preview nodes={p.nodes} edges={p.edges} />
              </Link>
              <div className="p-4">
                <h2 className="truncate text-[15px] font-semibold" title={p.name}>
                  {p.name}
                </h2>
                <p className="mt-0.5 truncate text-[12.5px] text-slate-500">{stackOf(p) || 'No technologies'}</p>
                <p className="mt-0.5 text-[12px] text-slate-400">
                  {p.nodes.length} components · {formatTime(p.updatedAt)}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link to={`${EDITOR_PATH}?project=${p.id}`} className={`${btnPrimary} flex-1`}>
                    Open
                  </Link>
                  <button className={btnGhost} onClick={() => rename(p)} aria-label={`Rename ${p.name}`} title="Rename">
                    <Pencil size={15} />
                  </button>
                  <button className={btnGhost} onClick={() => duplicate(p)} aria-label={`Duplicate ${p.name}`} title="Duplicate">
                    <Copy size={15} />
                  </button>
                  <button
                    className={`${btnGhost} hover:!border-red-300 hover:!bg-red-50 hover:!text-red-600`}
                    onClick={() => remove(p)}
                    aria-label={`Delete ${p.name}`}
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Saved;
