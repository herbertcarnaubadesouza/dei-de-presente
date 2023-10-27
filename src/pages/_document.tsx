import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const AnyNextScript = NextScript as any;
  const AnyHead = Head as any;

  return (
    <Html lang="en">
      <AnyHead />
      <title>Dei de presente</title>
      <link rel="icon" href="/presente.png" />
      <body>
        <Main />
        <AnyNextScript />
      </body>
    </Html>
  );
}
