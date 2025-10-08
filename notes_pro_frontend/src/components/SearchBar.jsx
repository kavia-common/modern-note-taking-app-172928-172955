import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, ariaLabel = 'Search' }) {
  return (
    <div className="searchbar" role="search">
      <span aria-hidden="true">🔎</span>
      <input
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
      />
    </div>
  );
}
