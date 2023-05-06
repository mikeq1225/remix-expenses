import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import sharedStyles from "~/styles/shared.css";
import type { V2_MetaFunction } from "@remix-run/node";
import type { PropsWithChildren } from "react";
import ErrorComponent from "~/components/util/ErrorComponent";

export const meta: V2_MetaFunction = () => {
  return [{ title: `Q's Expenses App` }];
};

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <main>
          <ErrorComponent title={error.statusText}>
            <p>{error.data?.message || "Something went wrong"}</p>
            <p>
              Back To <Link to={"/"}>Safety</Link>
            </p>
          </ErrorComponent>
        </main>
      </Document>
    );
  }

  const defaultErrorMessage = "Unknown error";
  return (
    <Document title={`Error - Q's Expenses App`}>
      <main>
        <ErrorComponent title={`An Error Occurred`}>
          <p>{error instanceof Error ? error.message : defaultErrorMessage}</p>
          <p>
            Back To <Link to={"/"}>Safety</Link>
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}

interface DocumentProps {
  title?: String;
}
function Document({ title, children }: PropsWithChildren<DocumentProps>) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
