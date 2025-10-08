export function generateId() {
  // PUBLIC_INTERFACE
  /** Generates a simple unique id suitable for client-side notes. */
  return 'n_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
