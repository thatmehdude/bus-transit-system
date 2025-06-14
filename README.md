# Lagos Bus Transit System

A modern web application for exploring Lagos bus routes, stops, and service alerts. Built with **React**, **TypeScript**, **Vite**, and **React Router**.

## Features

- 🚍 **Browse Bus Routes:** View all available routes, their schedules, and current status (on-time, delayed, cancelled).
- ⭐ **Favorites:** Mark routes as favorites for quick access.
- ⏰ **Live Arrival Times:** Refresh and view the latest arrival times for each route.
- 🛑 **Stop Lookup:** Search for bus stops and see which routes serve them, plus upcoming arrivals.
- ⚠️ **Alerts Center:** View and report service alerts with severity levels (warning, critical).
- 🔍 **Global Search:** Quickly search for routes from the navigation bar.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [ESLint](https://eslint.org/) for code quality

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/bus-transit.git
   cd bus-transit
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Build for production:**
   ```sh
   npm run build
   ```

## Directory Structure

```
src/
  components/      # Reusable UI components (e.g., NavBar)
  pages/           # Route-based pages (Home, Favourites, Alerts, etc.)
  assets/          # Static assets (SVGs, images)
  mockData.ts      # Mock data for routes, stops, and alerts
  RouteContext.tsx # React context for global state
  App.tsx          # Main app component with routing
  main.tsx         # Entry point
  index.css        # Global styles
```
