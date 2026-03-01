import type { UnsplashImage } from '../types';

interface PhotoGalleryProps {
  images: UnsplashImage[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {images.map((image, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg">
          <img
            src={image.url}
            alt={image.alt}
            loading="lazy"
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1">
            <span className="text-xs text-gray-300">{image.credit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
