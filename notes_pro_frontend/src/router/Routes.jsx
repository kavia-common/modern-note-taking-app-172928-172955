import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotesPage from '../pages/NotesPage';
import NoteDetailPage from '../pages/NoteDetailPage';
import ArchivedPage from '../pages/ArchivedPage';
import TrashPage from '../pages/TrashPage';
import SettingsPage from '../pages/SettingsPage';

// PUBLIC_INTERFACE
export default function RoutesView() {
  /**
   * Defines application routing.
   * Routes:
   * - /              -> Notes list with search
   * - /note/:id      -> Note detail and editor
   * - /archived      -> Archived notes
   * - /trash         -> Deleted notes
   * - /settings      -> App settings
   */
  return (
    <Routes>
      <Route path="/" element={<NotesPage />} />
      <Route path="/note/:id" element={<NoteDetailPage />} />
      <Route path="/archived" element={<ArchivedPage />} />
      <Route path="/trash" element={<TrashPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}
