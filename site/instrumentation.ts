// Node.js 24+ ships a Web Storage API that creates a non-functional localStorage
// proxy when --localstorage-file is missing or invalid. next-themes (used by
// fumadocs-ui) calls localStorage.getItem() during SSR and crashes. Remove the
// broken proxy so the library falls back to its normal SSR code path.
export function register() {
  if (
    typeof globalThis.localStorage !== 'undefined' &&
    typeof globalThis.localStorage.getItem !== 'function'
  ) {
    delete (globalThis as Record<string, unknown>).localStorage;
  }
}
