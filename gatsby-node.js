const path = require("path");

// Explicit schema so the site builds even when no project has a cover image,
// or the art list is empty.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SiteSiteMetadata {
      title: String
      name: String
      siteUrl: String
      headline: String
      bio: [String]
      photo: String
      photoAlt: String
      github: String
      links: [SiteLink]
    }
    type SiteLink {
      label: String
      url: String
    }
    type MarkdownRemark implements Node {
      frontmatter: ProjectFrontmatter
      fields: ProjectFields
    }
    type ProjectFields {
      slug: String
    }
    type ProjectFrontmatter {
      title: String
      slug: String
      summary: String
      year: Int
      tech: [String]
      repo: String
      demo: String
      featured: Boolean
      cover: File @fileByRelativePath
      coverAlt: String
    }
    type ArtYaml implements Node {
      title: String
      medium: String
      year: Int
      alt: String
      featured: Boolean
      image: File @fileByRelativePath
    }
  `);
};

// Each markdown file in content/projects becomes /projects/<slug>/.
// The slug is `slug:` from the front matter, or else the file name.
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== "MarkdownRemark") return;
  const file = getNode(node.parent);
  const slug = (node.frontmatter && node.frontmatter.slug) || (file && file.name);
  actions.createNodeField({ node, name: "slug", value: slug });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild("Could not query project pages", result.errors);
    return;
  }
  result.data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: `/projects/${node.fields.slug}/`,
      component: path.resolve("./src/templates/project.js"),
      context: { id: node.id },
    });
  });
};
