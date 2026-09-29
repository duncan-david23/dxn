"use client";

import { useState, useEffect } from "react";
import Loading from "../app/loading";

export default function PageGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const reveal = () => {
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, 5000);
    };

    const ready$ =
      typeof document !== "undefined" && document.fonts
        ? document.fonts.ready
        : Promise.resolve();

    ready$.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(reveal);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {!ready && <Loading />}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.4s ease",
          visibility: ready ? "visible" : "hidden",
        }}
        aria-hidden={!ready}
      >
        {children}
      </div>
    </>
  );
}