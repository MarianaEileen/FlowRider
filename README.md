# FlowRider

FlowRider is a React dashboard prototype for presenting project activity, delivery progress, supporting documents, weekly metrics, and an integration flow in one place.

The current interface is built from reusable UI components and local mock data, making it a practical foundation for connecting real services later.

## Highlights

- Executive project summary and sprint-progress indicator.
- Document cards with configurable actions.
- Weekly performance chart and pending-task list.
- Filterable activity register.
- Horizontally scrollable integration-flow carousel.
- Reusable, typed React components for common interface patterns.

## Technology

- React 19
- TypeScript
- Vite
- Oxlint

## Requirements

- Node.js 20 or later
- npm 10 or later

## Getting started

Clone the repository and enter the application directory:

```bash
git clone https://github.com/MarianaEileen/FlowRider.git
cd FlowRider/flowrider
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite will print the local URL in the terminal, normally `http://localhost:5173`.

## Available commands

Run these commands from the `flowrider` directory.

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server with hot reload. |
| `npm run build` | Type-checks the project and creates a production build. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs Oxlint across the project. |

## Project structure

```text
FlowRider/
├── README.md
├── package.json              # Root development tooling
└── flowrider/
    ├── public/               # Static assets
    ├── src/
    │   ├── App.tsx           # Dashboard composition and mock data
    │   ├── Boton.tsx         # Reusable action button
    │   ├── BarraProgreso.tsx # Animated progress indicator
    │   ├── Carrusel.tsx      # Scrollable card carousel
    │   ├── Documento.tsx     # Document entry card
    │   ├── Grafica.tsx       # Bar-chart component
    │   ├── Imagen.tsx        # Responsive image component
    │   ├── ListaFiltro.tsx   # Filterable activity list
    │   ├── ListaSimple.tsx   # Compact list component
    │   ├── Parrafo.tsx       # Text block component
    │   ├── Titulo.tsx        # Section-heading component
    │   └── main.tsx          # React entry point
    └── package.json          # Application scripts and dependencies
```

## Development notes

- The dashboard content in `src/App.tsx` is mock data intended to demonstrate each component. Replace it with API or state-management data as integrations are defined.
- Keep shared presentation patterns in their own components under `src/` rather than duplicating markup in `App.tsx`.
- Do not commit environment-specific files such as `.DS_Store`.

## Git workflow

Before starting work, update your local references and current branch:

```bash
git fetch --all --prune
git pull
```

Create a focused branch for a change and publish it when ready:

```bash
git switch -c feature/short-description
git add flowrider/src/App.tsx
git commit -m "Describe the change"
git push -u origin feature/short-description
```

## Status

The project currently provides a functional dashboard composition with reusable frontend components. Data sources, persistence, authentication, and production deployment have not yet been added.
