import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const captionFor = (a) => {
  const bits = [a.medium, a.year].filter(Boolean).join(", ");
  return [a.title, bits].filter(Boolean).join(" — ");
};

export default function ArtGallery({ items }) {
  const [index, setIndex] = React.useState(null);
  const dialogRef = React.useRef(null);
  const openerRef = React.useRef(null);
  const n = items.length;

  const open = (i, e) => {
    openerRef.current = e.currentTarget;
    setIndex(i);
  };
  const close = () => dialogRef.current && dialogRef.current.close();

  // Show the dialog once an item is selected.
  React.useEffect(() => {
    const d = dialogRef.current;
    if (index !== null && d && !d.open) d.showModal();
  }, [index]);

  const onClosed = () => {
    setIndex(null);
    if (openerRef.current) openerRef.current.focus();
  };

  const step = (delta) => setIndex((i) => (i + delta + n) % n);
  const onKey = (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };

  const current = index !== null ? items[index] : null;

  return (
    <>
      <div className="gallery">
        {items.map((a, i) => {
          const thumb = getImage(a.image && a.image.childImageSharp && a.image.childImageSharp.thumb);
          return (
            <figure className="piece" key={`${a.title}-${i}`}>
              <button
                type="button"
                className="piece-btn"
                onClick={(e) => open(i, e)}
                aria-label={`View ${a.title || "artwork"} larger`}
              >
                {thumb && <GatsbyImage image={thumb} alt={a.alt || a.title || "Artwork"} />}
              </button>
              {(a.title || a.medium || a.year) && (
                <figcaption>
                  {a.title && <strong>{a.title}</strong>}
                  {[a.medium, a.year].filter(Boolean).length > 0 &&
                    `${a.title ? " · " : ""}${[a.medium, a.year].filter(Boolean).join(", ")}`}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        aria-label="Artwork viewer"
        onClose={onClosed}
        onKeyDown={onKey}
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        {current && (
          <>
            <div className="lb-inner">
              {getImage(current.image && current.image.childImageSharp && current.image.childImageSharp.large) && (
                <GatsbyImage
                  image={getImage(current.image.childImageSharp.large)}
                  alt={current.alt || current.title || "Artwork"}
                  objectFit="contain"
                />
              )}
              <p className="lb-cap">{captionFor(current)}</p>
            </div>
            <button type="button" className="lb-btn lb-close" onClick={close} aria-label="Close">×</button>
            {n > 1 && (
              <>
                <button type="button" className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Previous artwork">‹</button>
                <button type="button" className="lb-btn lb-next" onClick={() => step(1)} aria-label="Next artwork">›</button>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
