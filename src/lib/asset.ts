// Resolves a file in /public against Vite's base URL, so paths work both on the
// dev server and on GitHub Pages where the site lives under /The-Ends-V3/.
// asset("canik.png") -> "/The-Ends-V3/canik.png"
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
