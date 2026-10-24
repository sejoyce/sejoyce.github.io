import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import ThemeToggle from "./ThemeToggle";
import { GitHub } from "./icons";

const NAV = [
  { to: "/", label: "About" },
  { to: "/projects/", label: "Projects" },
  { to: "/art/", label: "Art" },
];

// Marks the nav item for the current section (Projects also covers /projects/<slug>/).
const isCurrent = (to) => ({ location, href }) => {
  const p = (location && location.pathname) || href || "";
  const on = to === "/" ? p === "/" : p.startsWith(to);
  return on ? { "aria-current": "page" } : {};
};

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

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className="masthead">
        <div className="wrap">
          <Link className="brand" to="/"></Link>
          <div className="mast-right">
            <nav className="mast-nav" aria-label="Main">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} getProps={isCurrent(n.to)}>{n.label}</Link>
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

export { GitHub };
