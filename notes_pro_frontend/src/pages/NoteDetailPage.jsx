import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteEditor from '../components/NoteEditor';
import { useNotes } from '../state/NotesContext';

// PUBLIC_INTERFACE
export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useNotes();

  const note = state.notes.find(n => n.id === id);

  if (!note) {
    return (
      <div className="empty-state">
        <div className="icon">❓</div>
        <h2>Note not found</h2>
        <button className="btn mt-2" onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  const handleSave = (updated) => {
    actions.updateNote(updated);
    navigate('/');
  };

  return (
    <div>
      <NoteEditor
        note={note}
        onSave={handleSave}
        onCancel={() => navigate(-1)}
      />
      <div className="row mt-2">
        {!note.archived && !note.deleted && (
          <button className="btn" onClick={() => actions.archiveNote(note.id)}>Archive</button>
        )}
        {note.archived && (
          <button className="btn" onClick={() => actions.unarchiveNote(note.id)}>Unarchive</button>
        )}
        {note.deleted ? (
          <button className="btn btn-primary" onClick={() => actions.restoreNote(note.id)}>Restore</button>
        ) : (
          <button className="btn btn-danger" onClick={() => { actions.deleteNote(note.id); navigate('/trash'); }}>Move to Trash</button>
        )}
      </div>
    </div>
  );
}
