import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function ProjectsPage({ data }) {
  const projects = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <div className="wrap page">
        <p className="eyebrow">Projects</p>
        <h1 className="page-title">Things I've built</h1>
        <p className="page-lede">A hand-picked set of projects, each with a short write-up.</p>

        {projects.length ? (
          <div className="cards">
            {projects.map((p) => {
              const f = p.frontmatter;
              const cover = getImage(f.cover && f.cover.childImageSharp);
              return (
                <article className="card" key={p.id}>
                  {cover && (
                    <div className="cover">
                      <GatsbyImage image={cover} alt={f.coverAlt || ""} />
                    </div>
                  )}
                  <div className="card-body">
                    {f.year && <span className="yr">{f.year}</span>}
                    <h3><Link to={`/projects/${p.fields.slug}/`}>{f.title}</Link></h3>
                    {f.summary && <p>{f.summary}</p>}
                    {f.tech && f.tech.length > 0 && (
                      <ul className="chips">{f.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                    )}
                    <div className="card-links">
                      {f.demo && <a href={f.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
                      {f.repo && <a href={f.repo} target="_blank" rel="noopener noreferrer">Source ↗</a>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty">Projects coming soon.</div>
        )}
      </div>
    </Layout>
  );
}

export const Head = () => <Seo title="Projects" description="Selected projects, with write-ups." />;

export const query = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { year: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          summary
          year
          tech
          repo
          demo
          coverAlt
          cover {
            childImageSharp {
              gatsbyImageData(width: 720, aspectRatio: 1.7778, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
