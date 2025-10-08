# Notes Pro Frontend

A modern, lightweight React app for creating and managing notes. Styled with the Ocean Professional theme.

## Features

- Routing via react-router-dom
  - /, /note/:id, /archived, /trash, /settings
- Notes CRUD flows
  - Create, update, delete (trash), restore, archive, unarchive, pin toggle, search
- Local persistence via localStorage
- Theme preference (light/dark) persisted
- Responsive grid, search bar, floating action button (FAB)
- Settings for theme and data export/import (JSON)
- API client shim (async) for future backend integration
- Accessibility: ARIA labels, focus-visible outlines
- Minimal smoke test updated to check header/FAB

## Getting Started

- Install dependencies:
  - npm install
  - Note: you may need `react-router-dom` installed: `npm install react-router-dom`
- Run dev:
  - npm start

## Code Structure

- src/router/Routes.jsx: Route definitions
- src/state/NotesContext.jsx: Global state, reducer, persistence, actions
- src/components/*: UI components (Header, SearchBar, NoteCard, NoteEditor, etc)
- src/pages/*: Route pages
- src/services/apiClient.js: Async API shim
- src/utils/*: Helpers and constants

## Theme

Ocean Professional palette:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb (light), #0b1220 (dark)
- Surface: #ffffff (light), #0f172a (dark)
- Text: #111827 (light), #E5E7EB (dark)

Focus styles are provided via `:focus-visible` to ensure keyboard accessibility.

## Testing

A basic smoke test asserts the presence of the header title or FAB:
- src/App.test.js
