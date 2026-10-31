# CloudSketch: Product Requirements

## Problem
Sketching a cloud architecture usually means a heavy diagramming tool or a messy whiteboard. Students and developers want a fast, cloud-specific way to draw a system and share it as an image.

## Goal
A browser-based, drag-and-drop tool to build a cloud architecture diagram and export it as a PNG. Frontend only, built in one week.

## Users
- Students presenting a project architecture
- Developers drafting a quick system design
- Interview candidates practicing system design

## Scope

**Must have**
- Right-side panel of components (Frontend, Backend, Database, Bucket, Load Balancer, Cache, Queue, CDN, API Gateway, Auth)
- Drag or click to add a component to the canvas
- Technology dropdown per component (e.g. Backend: Python / Node.js / Go)
- Rename components
- Connect components with arrows
- Delete nodes and connections
- Export diagram as PNG
- "CloudSketch" branding at top-left

**Should have**
- Minimap, zoom and pan controls
- Clear canvas button
- Sample diagram on first load

**Later (out of scope now)**
- Save and load diagrams (localStorage or JSON file)
- Undo / redo
- Dark mode toggle
- Export as SVG or JSON
- Shareable link
- Backend, accounts, real-time collaboration

## User Stories
1. As a user, I drag a database onto the canvas so I can add it to my design.
2. As a user, I pick "Go" for my backend so the diagram shows my real stack.
3. As a user, I connect the load balancer to the backend to show traffic flow.
4. As a user, I export the diagram as an image for slides or a README.

## Success Criteria
- A 5-component diagram can be built and exported in under 2 minutes
- Works on latest Chrome, Edge and Firefox
- Export PNG matches what is on screen
- Deployed on Vercel or Netlify with a README and screenshots

## Timeline (1 week)
| Day | Work |
|-----|------|
| 1 | Setup, design choice, layout |
| 2-3 | Canvas, custom nodes, sidebar drag and drop |
| 4 | Technology dropdowns, connections, delete |
| 5 | PNG export, clear, minimap |
| 6 | Styling polish, responsive fixes |
| 7 | Deploy, README, screenshots |