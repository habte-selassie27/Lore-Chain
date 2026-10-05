import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/source-serif-4";
import {AppShell} from "@/frontend/components/app-shell";
import {WalletProvider} from "@/frontend/components/wallet-provider";
import {AppRoutes} from "./routes";
import "./globals.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root is missing in index.html");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>,
);
