import React from 'react';

// PUBLIC_INTERFACE
export default function TagPill({ label }) {
  return <span className="tag" aria-label={`Tag ${label}`}># {label}</span>;
}
