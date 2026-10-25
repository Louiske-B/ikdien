"use client";

import { useCallback, useEffect, useSyncExternalStore, type RefObject } from "react";

/**
 * Geeft de huidige tijd (afgerond op `stap` ms) terug, of `null` op de server en bij de
 * eerste render in de browser. Zo klopt de HTML van de server altijd met de eerste render
 * in de browser (geen hydration-fout) en tellen we pas na het laden.
 */
export function useNow(stap = 60_000): number | null {
  const subscribe = useCallback(
    (cb: () => void) => {
      const id = setInterval(cb, stap);
      return () => clearInterval(id);
    },
    [stap],
  );
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / stap) * stap,
    () => null,
  );
}

const FOCUSBAAR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Houdt de focus binnen `ref` zolang `actief`, sluit met Esc en zet de focus
 * na het sluiten terug op het element dat de focus had.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, actief: boolean, sluit: () => void) {
  useEffect(() => {
    if (!actief) return;
    const vorige = document.activeElement as HTMLElement | null;
    const el = ref.current;
    el?.querySelector<HTMLElement>(FOCUSBAAR)?.focus();

    function keydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        sluit();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSBAAR));
      if (items.length === 0) return;
      const eerste = items[0];
      const laatste = items[items.length - 1];
      if (e.shiftKey && document.activeElement === eerste) {
        e.preventDefault();
        laatste.focus();
      } else if (!e.shiftKey && document.activeElement === laatste) {
        e.preventDefault();
        eerste.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      vorige?.focus();
    };
  }, [ref, actief, sluit]);
}
