import React from 'react';

// PUBLIC_INTERFACE
export default function FAB({ onClick, ariaLabel = 'Create' }) {
  return (
    <button className="fab" onClick={onClick} aria-label={ariaLabel} title="Add note" data-testid="fab">
      +
    </button>
  );
}
