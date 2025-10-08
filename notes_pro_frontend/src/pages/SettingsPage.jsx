import React, { useRef } from 'react';
import { useNotes } from '../state/NotesContext';

// PUBLIC_INTERFACE
export default function SettingsPage() {
  const { state, actions } = useNotes();
  const fileRef = useRef(null);

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ notes: state.notes, theme: state.theme }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes_pro_export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      actions.importData(json);
    } catch {
      alert('Invalid file format');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <section aria-label="Settings">
      <h2 className="mb-2">Settings</h2>
      <div className="card mb-4">
        <div className="row space-between">
          <div>
            <div className="bold">Theme</div>
            <div className="small muted">Choose light or dark mode</div>
          </div>
          <div className="row">
            <button className="btn" onClick={() => actions.setTheme('light')} aria-pressed={state.theme === 'light'}>Light</button>
            <button className="btn" onClick={() => actions.setTheme('dark')} aria-pressed={state.theme === 'dark'}>Dark</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="bold mb-2">Data</div>
        <div className="row">
          <button className="btn btn-primary" onClick={exportData}>Export JSON</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            aria-label="Import JSON"
            onChange={importData}
          />
        </div>
      </div>
    </section>
  );
}
