const React = require("react");

// Sets the saved theme before first paint so there is no flash.
// Light is the default; dark only if the visitor chose it.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`;

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "en" });
  setHeadComponents([
    <script key="theme" dangerouslySetInnerHTML={{ __html: themeScript }} />,
    <link key="pc1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="pc2" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="font"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
    />,
  ]);
};
