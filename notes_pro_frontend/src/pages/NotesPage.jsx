import React from 'react';
import { useNotes } from '../state/NotesContext';
import NoteCard from '../components/NoteCard';
import EmptyState from '../components/EmptyState';

// PUBLIC_INTERFACE
export default function NotesPage() {
  const { state, actions } = useNotes();
  const visible = state.notes
    .filter(n => !n.deleted && !n.archived)
    .filter(n => {
      const q = state.search.trim().toLowerCase();
      if (!q) return true;
      return (
        (n.title || '').toLowerCase().includes(q) ||
        (n.content || '').toLowerCase().includes(q) ||
        (n.tags || []).some(t => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => (b.pinned - a.pinned) || (new Date(b.updatedAt) - new Date(a.updatedAt)));

  if (visible.length === 0) {
    return <EmptyState title="No matching notes" subtitle="Use the + button to create a new note." />;
  }

  return (
    <section aria-label="Notes list" className="grid">
      {visible.map(note => (
        <div key={note.id} className="grid-item">
          <NoteCard
            note={note}
            onArchive={(n) => actions.archiveNote(n.id)}
            onUnarchive={(n) => actions.unarchiveNote(n.id)}
            onDelete={(n) => actions.deleteNote(n.id)}
            onRestore={(n) => actions.restoreNote(n.id)}
            onPinToggle={(n) => actions.togglePin(n.id)}
          />
        </div>
      ))}
    </section>
  );
}
