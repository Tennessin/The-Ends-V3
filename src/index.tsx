import { StrictMode, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProgressionPage } from "./screens/Progression";
import { Windy } from "./screens/Windy";

// Vite's base ("/The-Ends-V3/") doubles as the router basename so links work on
// the dev server and on GitHub Pages alike.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

/** Jump to the top when switching pages; in-page #anchors keep native behaviour. */
function ScrollReset(): null {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ScrollReset />
      <Routes>
        <Route path="/" element={<Windy />} />
        <Route path="/progression" element={<ProgressionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
