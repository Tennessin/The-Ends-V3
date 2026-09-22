import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Windy } from "./screens/Windy";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Windy />
  </StrictMode>,
);
