import * as React from "react";
import { Link, useStaticQuery, graphql, withPrefix } from "gatsby";
import ThemeToggle from "./ThemeToggle";

// One page: each nav item scrolls to a section of the home page.
const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  {/* ----{ id: "art", label: "Art" },---- */}
];

// Highlights the nav item for the section currently in view (home page only).
function useActiveSection() {
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) {
      setActive(null);
      return undefined;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = els[0].id;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = els[els.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return active;
}

export default function Layout({ children }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          github
          links {
            label
            url
          }
        }
      }
    }
  `);
  const meta = site.siteMetadata;
  const links = [{ label: "GitHub", url: meta.github }, ...(meta.links || [])];
  const active = useActiveSection();
  const home = withPrefix("/");

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className="masthead">
        <div className="wrap">
          <Link className="brand" to="/"></Link>
          <div className="mast-right">
            <nav className="mast-nav" aria-label="Sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`${home}#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="content">{children}</main>
      <footer className="footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {meta.name}</span>
          <ul aria-label="Links">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.url}
                  {...(/^mailto:/i.test(l.url) ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
