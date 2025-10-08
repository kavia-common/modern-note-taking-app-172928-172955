import React from 'react';
import { Link } from 'react-router-dom';
import TagPill from './TagPill';

// PUBLIC_INTERFACE
export default function NoteCard({
  note,
  onArchive,
  onUnarchive,
  onDelete,
  onRestore,
  onPinToggle,
}) {
  const { id, title, content, tags = [], pinned, archived, deleted, updatedAt } = note;

  return (
    <article className="card" aria-label={`Note ${title || 'Untitled'}`}>
      <header className="row space-between">
        <Link to={`/note/${id}`} className="bold card-title">
          {pinned ? '📌 ' : ''}{title || 'Untitled'}
        </Link>
        <button
          className="btn icon-btn"
          aria-label={pinned ? 'Unpin note' : 'Pin note'}
          onClick={() => onPinToggle?.(note)}
          title={pinned ? 'Unpin' : 'Pin'}
        >
          {pinned ? '📍' : '📌'}
        </button>
      </header>

      <div className="small muted card-meta">
        {new Date(updatedAt).toLocaleString()}
      </div>

      <p className="mt-2 mb-2" style={{ whiteSpace: 'pre-line' }}>
        {content?.slice(0, 220) || 'No content'}
        {content && content.length > 220 ? '…' : ''}
      </p>

      <div className="row mt-2 mb-2" aria-label="Tags">
        {tags.map((t) => <TagPill key={t} label={t} />)}
      </div>

      <div className="card-actions">
        {!archived && !deleted && (
          <button className="btn" onClick={() => onArchive?.(note)} aria-label="Archive note">Archive</button>
        )}
        {archived && !deleted && (
          <button className="btn" onClick={() => onUnarchive?.(note)} aria-label="Unarchive note">Unarchive</button>
        )}
        {deleted ? (
          <button className="btn btn-primary" onClick={() => onRestore?.(note)} aria-label="Restore note">Restore</button>
        ) : (
          <button className="btn btn-danger" onClick={() => onDelete?.(note)} aria-label="Move note to trash">Trash</button>
        )}
        <Link to={`/note/${id}`} className="btn" aria-label="Open note">Open</Link>
      </div>
    </article>
  );
}
