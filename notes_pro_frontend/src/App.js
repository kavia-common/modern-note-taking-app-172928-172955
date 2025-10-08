import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './index.css';
import { NotesProvider, useNotes } from './state/NotesContext';
import RoutesView from './router/Routes';
import Header from './components/Header';
import FAB from './components/FAB';
import { THEME_STORAGE_KEY } from './utils/constants';

// Layout wrapper to apply theme to the document and render header/routes/fab
function AppShell() {
  const { state, actions } = useNotes();

  // Apply theme to <html> for CSS variables
  useEffect(() => {
    const themeAttr = state.theme;
    document.documentElement.setAttribute('data-theme', themeAttr);
  }, [state.theme]);

  // PUBLIC_INTERFACE
  const onToggleTheme = () => {
    actions.toggleTheme();
  };

  return (
    <div className="App" data-testid="app-root">
      <Header
        title="Notes Pro"
        theme={state.theme}
        onToggleTheme={onToggleTheme}
      />
      <main className="container" role="main" aria-label="Main Content">
        <RoutesView />
      </main>
      <FAB ariaLabel="Add note" onClick={() => actions.createNote()} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component.
   * - Wraps Router and global NotesProvider.
   * - Ensures theme preference is loaded before shell renders.
   */
  useEffect(() => {
    // Ensure initial theme attribute for SSR/CSS flash mitigation
    const initialTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  return (
    <BrowserRouter>
      <NotesProvider>
        <AppShell />
      </NotesProvider>
    </BrowserRouter>
  );
}

export default App;
