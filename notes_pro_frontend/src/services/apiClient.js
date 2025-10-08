const delay = (ms = 10) => new Promise((res) => setTimeout(res, ms));

/**
 * A backend-ready API shim. Currently no-ops with a minimal delay to simulate async flows.
 * Replace implementations with real HTTP calls in the future.
 */
export const api = {
  // PUBLIC_INTERFACE
  async create(note) {
    await delay();
    return { ok: true, data: note };
  },
  // PUBLIC_INTERFACE
  async update(note) {
    await delay();
    return { ok: true, data: note };
  },
  // PUBLIC_INTERFACE
  async trash(id) {
    await delay();
    return { ok: true, id };
  },
  // PUBLIC_INTERFACE
  async restore(id) {
    await delay();
    return { ok: true, id };
  },
  // PUBLIC_INTERFACE
  async remove(id) {
    await delay();
    return { ok: true, id };
  },
  // PUBLIC_INTERFACE
  async archive(id) {
    await delay();
    return { ok: true, id };
  },
  // PUBLIC_INTERFACE
  async unarchive(id) {
    await delay();
    return { ok: true, id };
  },
  // PUBLIC_INTERFACE
  async togglePin(id) {
    await delay();
    return { ok: true, id };
  },
};
