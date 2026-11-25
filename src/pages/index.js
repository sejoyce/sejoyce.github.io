import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const yearOf = (date) => (date ? String(date).slice(0, 4) : "");

function ProjectCard({ p }) {
  const cover = getImage(p.cover && p.cover.childImageSharp);
  const target = p.demo || p.repo;
  const coverNode = cover ? (
    <GatsbyImage image={cover} alt={p.coverAlt || ""} />
  ) : (
    <span aria-hidden="true">{(p.title || "?").trim().charAt(0)}</span>
  );
  // The whole card is clickable: the title link is stretched over it (see .card-link in the CSS).
  // The demo/source buttons sit above that layer and keep their own links.
  return (
    <article className={`card${target ? " clickable" : ""}`}>
      <div className={`cover${cover ? "" : " ph"}`}>{coverNode}</div>
      <div className="card-body">
        {p.date && <span className="yr">{yearOf(p.date)}</span>}
        <h3>
          {target ? (
            <a className="card-link" href={target} target="_blank" rel="noopener noreferrer">
              {p.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            p.title
          )}
        </h3>
        {p.summary && <p>{p.summary}</p>}
        {p.tech && p.tech.length > 0 && (
          <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        )}
        <div className="card-links">
          {p.demo && (
            <a className="btn primary" href={p.demo} target="_blank" rel="noopener noreferrer">
              Live demo ↗
            </a>
          )}
          {p.repo && (
            <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">
              Source ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HomePage({ data }) {
  const m = data.site.siteMetadata;
  const projects = data.projects.nodes;

  return (
    <Layout>
      {/* ---- About ---- */}
      <section id="about" className="hero" aria-labelledby="name">
        <div className={`wrap hero-grid${m.photo ? " has-photo" : ""}`}>
          <div className="hero-head">
            <p className="eyebrow">Hello, I'm</p>
            <h1 id="name">{m.name}</h1>
            {m.headline && <p className="headline">{m.headline}</p>}
          </div>
          {m.photo && (
            <figure className="portrait" style={{ margin: 0 }}>
              <img src={m.photo} alt={m.photoAlt || ""} />
            </figure>
          )}
          <div className="hero-body">
            <div className="bio">
              {m.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Projects ---- */}
      <section id="projects" className="section" aria-labelledby="projects-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="projects-h">Projects</h2>
            <a className="more" href={`${m.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              More on GitHub ↗
            </a>
          </div>
          <p className="section-lede">Things I've built and published.</p>
          {projects.length ? (
            <div className="cards">
              {projects.map((p) => <ProjectCard p={p} key={p.title} />)}
            </div>
          ) : (
            <div className="empty">Projects coming soon.</div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const Head = () => <Seo />;

export const query = graphql`
  {
    site {
      siteMetadata {
        name
        headline
        bio
        photo
        photoAlt
        github
      }
    }
    projects: allProjectsYaml(sort: { date: DESC }) {
      nodes {
        title
        summary
        date
        tech
        repo
        demo
        coverAlt
        cover {
          childImageSharp {
            gatsbyImageData(width: 760, aspectRatio: 2, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
