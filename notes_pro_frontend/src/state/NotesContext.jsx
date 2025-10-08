import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { api } from '../services/apiClient';
import { THEME_STORAGE_KEY, NOTES_STORAGE_KEY } from '../utils/constants';
import { generateId } from '../utils/formatters';

const NotesCtx = createContext(null);

const initialState = {
  notes: [],
  search: '',
  theme: 'light',
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'CREATE': {
      return { ...state, notes: [action.payload, ...state.notes] };
    }
    case 'UPDATE': {
      const notes = state.notes.map(n => (n.id === action.payload.id ? { ...n, ...action.payload } : n));
      return { ...state, notes };
    }
    case 'DELETE': {
      const notes = state.notes.map(n => (n.id === action.payload ? { ...n, deleted: true, archived: false, updatedAt: new Date().toISOString() } : n));
      return { ...state, notes };
    }
    case 'RESTORE': {
      const notes = state.notes.map(n => (n.id === action.payload ? { ...n, deleted: false, updatedAt: new Date().toISOString() } : n));
      return { ...state, notes };
    }
    case 'PERMA_DELETE': {
      const notes = state.notes.filter(n => n.id !== action.payload);
      return { ...state, notes };
    }
    case 'ARCHIVE': {
      const notes = state.notes.map(n => (n.id === action.payload ? { ...n, archived: true, deleted: false, updatedAt: new Date().toISOString() } : n));
      return { ...state, notes };
    }
    case 'UNARCHIVE': {
      const notes = state.notes.map(n => (n.id === action.payload ? { ...n, archived: false, updatedAt: new Date().toISOString() } : n));
      return { ...state, notes };
    }
    case 'PIN_TOGGLE': {
      const notes = state.notes.map(n => (n.id === action.payload ? { ...n, pinned: !n.pinned, updatedAt: new Date().toISOString() } : n));
      return { ...state, notes };
    }
    case 'IMPORT':
      return { ...state, notes: action.payload.notes || state.notes, theme: action.payload.theme || state.theme };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /**
   * Provides global state for notes with localStorage persistence.
   * Async API calls are routed through the apiClient shim with await,
   * allowing future backend integration without refactor.
   */
  const [persistedNotes, setPersistedNotes] = useLocalStorage(NOTES_STORAGE_KEY, []);
  const [persistedTheme, setPersistedTheme] = useLocalStorage(THEME_STORAGE_KEY, 'light');

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    notes: persistedNotes || [],
    theme: persistedTheme || 'light',
  });

  useEffect(() => {
    dispatch({ type: 'INIT', payload: { notes: persistedNotes || [], theme: persistedTheme || 'light' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPersistedNotes(state.notes);
  }, [state.notes, setPersistedNotes]);

  useEffect(() => {
    setPersistedTheme(state.theme);
  }, [state.theme, setPersistedTheme]);

  const actions = useMemo(() => ({
    // PUBLIC_INTERFACE
    setSearch: (q) => dispatch({ type: 'SET_SEARCH', payload: q }),
    // PUBLIC_INTERFACE
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    // PUBLIC_INTERFACE
    toggleTheme: () => dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' }),

    // PUBLIC_INTERFACE
    async createNote() {
      const now = new Date().toISOString();
      const newNote = {
        id: generateId(),
        title: 'Untitled',
        content: '',
        tags: [],
        pinned: false,
        archived: false,
        deleted: false,
        createdAt: now,
        updatedAt: now,
      };
      await api.create(newNote); // shim call
      dispatch({ type: 'CREATE', payload: newNote });
      return newNote;
    },

    // PUBLIC_INTERFACE
    async updateNote(note) {
      const updated = { ...note, updatedAt: new Date().toISOString() };
      await api.update(updated);
      dispatch({ type: 'UPDATE', payload: updated });
      return updated;
    },

    // PUBLIC_INTERFACE
    async deleteNote(id) {
      await api.trash(id);
      dispatch({ type: 'DELETE', payload: id });
    },

    // PUBLIC_INTERFACE
    async restoreNote(id) {
      await api.restore(id);
      dispatch({ type: 'RESTORE', payload: id });
    },

    // PUBLIC_INTERFACE
    async permanentlyDelete(id) {
      await api.remove(id);
      dispatch({ type: 'PERMA_DELETE', payload: id });
    },

    // PUBLIC_INTERFACE
    async archiveNote(id) {
      await api.archive(id);
      dispatch({ type: 'ARCHIVE', payload: id });
    },

    // PUBLIC_INTERFACE
    async unarchiveNote(id) {
      await api.unarchive(id);
      dispatch({ type: 'UNARCHIVE', payload: id });
    },

    // PUBLIC_INTERFACE
    async togglePin(id) {
      await api.togglePin(id);
      dispatch({ type: 'PIN_TOGGLE', payload: id });
    },

    // PUBLIC_INTERFACE
    importData(data) {
      dispatch({ type: 'IMPORT', payload: data || {} });
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [state.theme]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <NotesCtx.Provider value={value}>{children}</NotesCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Hook to access Notes context */
  const ctx = useContext(NotesCtx);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
