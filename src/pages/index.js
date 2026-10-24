import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function HomePage({ data }) {
  const m = data.site.siteMetadata;
  const projects = data.projects.nodes;
  const art = data.art.nodes;

  return (
    <Layout>
      {/* ---- About: front and center ---- */}
      <section className="hero" aria-labelledby="name">
        <div className={`wrap hero-grid${m.photo ? " has-photo" : ""}`}>
          <div>
            <p className="eyebrow">Hello, I'm</p>
            <h1 id="name">{m.name}</h1>
            {m.headline && <p className="headline">{m.headline}</p>}
            <div className="bio">
              {m.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="hero-links">
              <Link className="btn primary" to="/projects/">See projects</Link>
              <Link className="btn" to="/art/">View art</Link>
              <a className="btn" href={m.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
          </div>
          {m.photo && (
            <figure className="portrait" style={{ margin: 0 }}>
              <img src={m.photo} alt={m.photoAlt || ""} />
            </figure>
          )}
        </div>
      </section>

      {/* ---- Two halves: code | art ---- */}
      <section className="duo" aria-label="Selected work">
        <div className="wrap duo-grid">
          <div className="duo-col">
            <div className="col-head">
              <h2><span className="num">01</span>Projects</h2>
              <Link className="more" to="/projects/">All projects →</Link>
            </div>
            {projects.length ? (
              <ul className="index">
                {projects.map((p) => (
                  <li key={p.id}>
                    <Link to={`/projects/${p.fields.slug}/`}>
                      <span className="yr">{p.frontmatter.year}</span>
                      <span className="t">
                        {p.frontmatter.title}
                        {p.frontmatter.summary && <span className="s">{p.frontmatter.summary}</span>}
                      </span>
                      <span className="go" aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty">Projects coming soon.</div>
            )}
          </div>

          <div className="duo-col">
            <div className="col-head">
              <h2><span className="num">02</span>Art</h2>
              <Link className="more" to="/art/">Full gallery →</Link>
            </div>
            {art.length ? (
              <div className="mosaic">
                {art.map((a, i) => {
                  const img = getImage(a.image && a.image.childImageSharp && a.image.childImageSharp.tile);
                  return (
                    <figure className="tile" key={`${a.title}-${i}`}>
                      <Link to="/art/" aria-label={`${a.title || "Artwork"} in the gallery`}>
                        {img && <GatsbyImage image={img} alt={a.alt || a.title || "Artwork"} />}
                      </Link>
                      {a.title && <figcaption>{a.title}</figcaption>}
                    </figure>
                  );
                })}
              </div>
            ) : (
              <div className="empty">Gallery coming soon.</div>
            )}
          </div>
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
    projects: allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
      sort: { frontmatter: { year: DESC } }
      limit: 4
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          summary
          year
        }
      }
    }
    art: allArtYaml(
      filter: { featured: { eq: true } }
      sort: { year: DESC }
      limit: 4
    ) {
      nodes {
        title
        alt
        image {
          childImageSharp {
            tile: gatsbyImageData(width: 480, height: 480, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
