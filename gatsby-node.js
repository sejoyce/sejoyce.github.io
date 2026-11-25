// Explicit schema so the site builds even when the project list is empty,
// no project has a cover image, or `links` is empty.
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
    type ProjectsYaml implements Node {
      title: String
      summary: String
      date: String
      tech: [String]
      repo: String
      demo: String
      cover: File @fileByRelativePath
      coverAlt: String
    }
  `);
};
