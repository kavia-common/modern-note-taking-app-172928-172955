import React, { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tagsStr, setTagsStr] = useState((note?.tags || []).join(', '));

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setTagsStr((note?.tags || []).join(', '));
  }, [note]);

  const handleSave = () => {
    const tags = tagsStr.split(',').map(s => s.trim()).filter(Boolean);
    onSave?.({ ...note, title, content, tags });
  };

  return (
    <section className="editor" aria-label="Note editor">
      <input
        className="title"
        placeholder="Note title…"
        aria-label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="body"
        placeholder="Start typing your note…"
        aria-label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        placeholder="Tags (comma separated)"
        aria-label="Tags"
        value={tagsStr}
        onChange={(e) => setTagsStr(e.target.value)}
      />

      <div className="toolbar">
        <button className="btn" onClick={onCancel} aria-label="Cancel">Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} aria-label="Save note">Save</button>
      </div>
    </section>
  );
}
