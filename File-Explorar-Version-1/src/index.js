import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import FileContextWrapper from "./context/MyContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FileContextWrapper>
      <App />
    </FileContextWrapper>
  </StrictMode>
);
