import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">LED Configurator</div>
            <div className="text-xs text-slate-400">Pick a setup. Make it glow.</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#categories" className="hover:text-white">
            Categories
          </a>
          <a href="#how" className="hover:text-white">
            How it works
          </a>
        </nav>

        <a
          href="/products"
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-100"
        >
          Configure products →
        </a>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:pt-16">
        <Outlet />

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-slate-400">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} LED Configurator</div>
            <div className="flex gap-4">
              <a href="/products" className="hover:text-white">
                Products
              </a>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
