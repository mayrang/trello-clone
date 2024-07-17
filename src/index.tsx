import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
