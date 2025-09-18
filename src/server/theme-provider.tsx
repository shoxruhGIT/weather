import React, { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const LIGHT = { bg: "#f8f9fa", text: "#212529", accent: "#0d6efd" };
const DARK = { bg: "#212529", text: "#f8f9fa", accent: "#0d6efd" };

function applyVars(theme: Theme) {
  const vars = theme === "light" ? LIGHT : DARK;
  const root = document.documentElement;
  root.style.setProperty("--bg", vars.bg);
  root.style.setProperty("--text", vars.text);
  root.style.setProperty("--custom-accent", vars.accent);

  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyVars(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer flex items-center justify-center"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export function ThemedCard({
  title = "Hello",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="p-6 rounded-2xl shadow-md max-w-md"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-sm">{children}</div>
      <a
        href="#"
        className="inline-block mt-4 underline"
        style={{ color: "var(--custom-accent)" }}
      >
        Accent link
      </a>
    </div>
  );
}
