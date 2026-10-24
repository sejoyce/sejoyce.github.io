import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function ProjectTemplate({ data }) {
  const { frontmatter: f, html } = data.markdownRemark;
  const cover = getImage(f.cover && f.cover.childImageSharp);
  return (
    <Layout>
      <div className="wrap page">
        <article className="article">
          <Link className="back" to="/projects/">← All projects</Link>
          <p className="eyebrow">{f.year || "Project"}</p>
          <h1 className="page-title">{f.title}</h1>
          {f.summary && <p className="page-lede" style={{ marginBottom: 20 }}>{f.summary}</p>}
          {f.tech && f.tech.length > 0 && (
            <ul className="chips">{f.tech.map((t) => <li key={t}>{t}</li>)}</ul>
          )}
          <div className="article-links">
            {f.demo && <a className="btn primary" href={f.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
            {f.repo && <a className="btn" href={f.repo} target="_blank" rel="noopener noreferrer">Source ↗</a>}
          </div>
          {cover && (
            <div className="hero-cover">
              <GatsbyImage image={cover} alt={f.coverAlt || ""} />
            </div>
          )}
          {/* Content comes from your own markdown files in /content/projects. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </Layout>
  );
}

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} description={data.markdownRemark.frontmatter.summary} />
);

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
            gatsbyImageData(width: 1000, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
