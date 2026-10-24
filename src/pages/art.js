import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ArtGallery from "../components/ArtGallery";

export default function ArtPage({ data }) {
  const items = data.allArtYaml.nodes;
  return (
    <Layout>
      <div className="wrap page">
        <p className="eyebrow">Art</p>
        <h1 className="page-title">Things I make by hand</h1>
        <p className="page-lede">Drawings, paintings, and other work away from the keyboard. Click any piece to see it larger.</p>
        {items.length ? <ArtGallery items={items} /> : <div className="empty">Gallery coming soon.</div>}
      </div>
    </Layout>
  );
}

export const Head = () => <Seo title="Art" description="Art portfolio." />;

export const query = graphql`
  {
    allArtYaml(sort: { year: DESC }) {
      nodes {
        title
        medium
        year
        alt
        image {
          childImageSharp {
            thumb: gatsbyImageData(width: 640, placeholder: BLURRED)
            large: gatsbyImageData(width: 1600, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
