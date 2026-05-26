"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-muted/40 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-full border border-border bg-card/60 text-foreground hover:bg-muted hover:scale-105 transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-sm"
      aria-label="Toggle themes"
      id="theme-toggle-btn"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-primary animate-[spin_12s_linear_infinite]" />
      ) : (
        <Moon className="w-5 h-5 text-primary" />
      )}
    </button>
  );
}
