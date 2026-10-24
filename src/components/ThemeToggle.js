import * as React from "react";
import { Moon, Sun } from "./icons";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  // Read what the inline head script already applied.
  React.useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    if (next) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {}
    setDark(next);
  };

  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
