# CloudSketch

CloudSketch is a browser-based visual editor for sketching cloud architectures and DevOps pipelines. Add components or stages to a canvas, connect them to show how a system works, and save or export your diagrams.

## Features

- Build cloud architecture diagrams with frontend, backend, database, storage, load balancer, cache, queue, CDN, API gateway, and authentication components.
- Build DevOps pipelines from stages such as source control, build, test, deployment, and monitoring.
- Add items by dragging them from the sidebar or clicking them, edit names and technology choices, and connect or delete items.
- Save, reopen, rename, duplicate, and delete projects using the Saved Projects page.
- Export diagrams as PNG images. Canvas drafts and saved projects are stored in the browser's local storage.
- Use zoom, pan, and minimap controls on the editors.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home page with links to the editors |
| `/architecture` | Cloud architecture diagram editor |
| `/pipeline` | DevOps pipeline editor |
| `/saved` | Manage saved architecture diagrams and pipelines |
| `/about` | Project overview |

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```
Clone the Repository
```bash
git clone https://github.com/AbhijeetNagar56/cloud-sketch.git
cd cloud-sketch
```

Vite prints the local development URL in the terminal. To create and preview a production build:

```bash
npm install
npm run build
npm run preview
```

## Built with

React, Vite, React Flow, Tailwind CSS, lucide-react, and html-to-image.
