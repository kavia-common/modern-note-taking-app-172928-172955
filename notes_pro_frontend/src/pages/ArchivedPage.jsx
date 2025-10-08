import React from 'react';
import { useNotes } from '../state/NotesContext';
import NoteCard from '../components/NoteCard';
import EmptyState from '../components/EmptyState';

// PUBLIC_INTERFACE
export default function ArchivedPage() {
  const { state, actions } = useNotes();
  const archived = state.notes.filter(n => n.archived && !n.deleted);

  if (archived.length === 0) {
    return <EmptyState title="No archived notes" subtitle="Archived notes will appear here." />;
  }

  return (
    <section aria-label="Archived notes" className="grid">
      {archived.map(note => (
        <div key={note.id} className="grid-item">
          <NoteCard
            note={note}
            onUnarchive={(n) => actions.unarchiveNote(n.id)}
            onDelete={(n) => actions.deleteNote(n.id)}
            onPinToggle={(n) => actions.togglePin(n.id)}
          />
        </div>
      ))}
    </section>
  );
}
