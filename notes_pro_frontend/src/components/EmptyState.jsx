import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'No notes yet', subtitle = 'Create your first note to get started.' }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="icon" aria-hidden="true">🗒️</div>
      <h2 className="mb-2">{title}</h2>
      <p className="muted">{subtitle}</p>
    </div>
  );
}
