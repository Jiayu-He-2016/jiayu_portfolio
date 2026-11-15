import { useState } from 'react';
import { artworks } from '../data/artworks';

function ArtworkImages({ artwork, detail = false }) {
  return (
    <div className={detail ? 'artwork-detail-images' : 'artwork-card-image'}>
      {artwork.images.map((image) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          data-bin-draggable={image.alt}
          draggable="false"
          loading="lazy"
        />
      ))}
    </div>
  );
}

export default function ArtworkGallery() {
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const selectedArtwork = artworks.find((artwork) => artwork.id === selectedArtworkId);

  if (selectedArtwork) {
    return (
      <section className="document-window artwork-detail">
        <button className="retro-button artwork-back-button" type="button" onClick={() => setSelectedArtworkId(null)}>
          Back to gallery
        </button>
        <h2>{selectedArtwork.title}</h2>
        <ArtworkImages artwork={selectedArtwork} detail />
        {selectedArtwork.description && <p>{selectedArtwork.description}</p>}
        {selectedArtwork.link && (
          <p>
            {selectedArtwork.link.label}:{' '}
            <a href={selectedArtwork.link.href} target="_blank" rel="noopener noreferrer">
              View implementation
            </a>
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="document-window artwork-gallery" aria-label="Artwork gallery">
      {artworks.map((artwork) => (
        <button
          className="artwork-card"
          type="button"
          key={artwork.id}
          onClick={() => setSelectedArtworkId(artwork.id)}
        >
          <ArtworkImages artwork={artwork} />
          <strong>{artwork.title}</strong>
          {artwork.description && <span>{artwork.description}</span>}
        </button>
      ))}
    </section>
  );
}
