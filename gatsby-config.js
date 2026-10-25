/**
 * Site settings live in siteMetadata below. Edit this block to change your
 * name, bio and links. Projects and art live in /content (see README).
 */
module.exports = {
  siteMetadata: {
    title: "Sarah",
    name: "Sarah",
    siteUrl: "https://sejoyce.github.io",
    headline: "Developer & artist",
    // One string per paragraph. Placeholders: replace with your own words.
    bio: [
      "I'm a full stack engineer relocating to Boston.",
      "Let's work together!",
    ],
    // Put a photo in /static (e.g. static/me.jpg) and set photo: "/me.jpg". Leave "" for none.
    photo: "me.jpg",
    photoAlt: "Portrait of Sarah",
    github: "https://github.com/sejoyce",
    links: [
      // { label: "Email", url: "mailto:you@example.com" },
      // { label: "LinkedIn", url: "https://www.linkedin.com/in/your-name/" },
      // { label: "Instagram", url: "https://www.instagram.com/your-handle/" },
    ],
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "projects", path: `${__dirname}/content/projects` },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "art", path: `${__dirname}/content/art` },
    },
  ],
};
