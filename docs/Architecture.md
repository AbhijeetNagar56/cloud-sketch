# CloudSketch: Architecture

## Overview
A single-page, frontend-only app. No backend and no database. All state lives in the browser.

## Tech Stack
| Purpose | Choice |
|---------|--------|
| Framework | React (Vite) |
| Canvas and graph | React Flow (`reactflow` v11) |
| Icons | `lucide-react` |
| PNG export | `html-to-image` |
| Styling | Plain CSS (injected in `Flow.jsx`) |
| Hosting | Vercel or Netlify |

## Structure
```
src/
  main.jsx        # app entry
  App.jsx         # renders <Flow />
  Flow.jsx        # everything below, in one file
```

Inside `Flow.jsx`:
| Part | Role |
|------|------|
| `CATALOG` | Config for each component type: label, icon, color, technology options |
| `ServiceNode` | Custom node: icon, editable name, technology dropdown, 4 connection handles |
| `Sidebar` | Right panel; items are draggable and clickable |
| `Canvas` | React Flow instance, drop handling, export, clear |
| `Flow` (default export) | Wraps `Canvas` in `ReactFlowProvider` |

## Data Model
```js
// Node
{ id, type: 'service', position: {x, y},
  data: { kind: 'backend', name: 'Backend', option: 'Python' } }

// Edge
{ id, source, target, sourceHandle, targetHandle }
```

## Key Flows
**Add component**
Sidebar item `dragstart` stores `kind` in `dataTransfer`. Canvas `onDrop` converts screen to flow coordinates and appends a node. A click adds one near the center.

**Edit component**
The node's name input or dropdown calls `setNodes` and updates only that node's `data`.

**Connect**
Dragging between handles fires `onConnect`, which calls `addEdge`. Loose connection mode lets any handle link to any other.

**Export PNG**
Compute bounds of all nodes, then the fit transform. Render `.react-flow__viewport` with `html-to-image` at that transform. Download the result as `cloudsketch-diagram.png`.

## State
Nodes and edges are held by `useNodesState` and `useEdgesState`. There is no global store.

## Adding a New Component
Add one entry to `CATALOG`. The sidebar and node rendering pick it up automatically.

## Future Extensions
- Persist to `localStorage` or a JSON file
- Undo / redo via a history stack
- Auto-layout (dagre)
- Optional backend for sharing and accounts