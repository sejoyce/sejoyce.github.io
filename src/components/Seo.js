import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

// Use inside a page as: export const Head = () => <Seo title="Projects" />
export default function Seo({ title, description }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          headline
        }
      }
    }
  `);
  const { name, headline } = site.siteMetadata;
  const full = title ? `${title} · ${name}` : `${name} · ${headline}`;
  const desc = description || `${name}: ${headline}. About, projects and art.`;
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
    </>
  );
}
