import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <Layout>
      <div className="wrap page">
        <p className="eyebrow">404</p>
        <h1 className="page-title">That page isn't here</h1>
        <p className="page-lede">It may have moved, or the link might be mistyped.</p>
        <Link className="btn primary" to="/">Back home</Link>
      </div>
    </Layout>
  );
}

export const Head = () => <Seo title="Not found" />;
