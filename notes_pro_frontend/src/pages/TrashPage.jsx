import React from 'react';
import { useNotes } from '../state/NotesContext';
import NoteCard from '../components/NoteCard';
import EmptyState from '../components/EmptyState';

// PUBLIC_INTERFACE
export default function TrashPage() {
  const { state, actions } = useNotes();
  const trashed = state.notes.filter(n => n.deleted);

  if (trashed.length === 0) {
    return <EmptyState title="Trash is empty" subtitle="Deleted notes will appear here until restored." />;
  }

  return (
    <section aria-label="Trash" className="grid">
      {trashed.map(note => (
        <div key={note.id} className="grid-item">
          <NoteCard
            note={note}
            onRestore={(n) => actions.restoreNote(n.id)}
            onDelete={(n) => actions.permanentlyDelete(n.id)}
            onPinToggle={(n) => actions.togglePin(n.id)}
          />
        </div>
      ))}
    </section>
  );
}
