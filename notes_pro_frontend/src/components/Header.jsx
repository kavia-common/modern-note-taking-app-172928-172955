import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useNotes } from '../state/NotesContext';

// PUBLIC_INTERFACE
export default function Header({ title = 'Notes Pro', theme, onToggleTheme }) {
  /** App Header with navigation, search, and theme toggle */
  const { state, actions } = useNotes();
  const location = useLocation();

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <div className="brand" aria-label="App Brand">
          <div className="logo" aria-hidden="true" />
          <span>{title}</span>
        </div>

        <SearchBar
          value={state.search}
          onChange={(val) => actions.setSearch(val)}
          ariaLabel="Search notes"
        />

        <nav aria-label="Main Navigation" className="header-actions">
          <Link className="btn btn-ghost" to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>All</Link>
          <Link className="btn btn-ghost" to="/archived" aria-current={location.pathname === '/archived' ? 'page' : undefined}>Archived</Link>
          <Link className="btn btn-ghost" to="/trash" aria-current={location.pathname === '/trash' ? 'page' : undefined}>Trash</Link>
          <Link className="btn btn-ghost" to="/settings" aria-current={location.pathname === '/settings' ? 'page' : undefined}>Settings</Link>
          <button
            className="btn icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}
