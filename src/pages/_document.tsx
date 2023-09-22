import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  const AnyNextScript = NextScript as any;
  const AnyHead = Head as any;

  return (
    <Html lang="en">
      <AnyHead />
      <body>
        <Main />
        <AnyNextScript />
      </body>
    </Html>
  );
}
