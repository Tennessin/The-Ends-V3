// Resolves a file in /public against Vite's base URL, so paths work both on the
// dev server and on GitHub Pages where the site lives under /WindyCity-Helper/.
// asset("canik.png") -> "/WindyCity-Helper/canik.png"
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
