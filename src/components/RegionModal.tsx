import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CulinaryRegion } from '../types';
import PhotoGallery from './PhotoGallery';

interface RegionModalProps {
  region: CulinaryRegion;
  onClose: () => void;
}

export default function RegionModal({ region, onClose }: RegionModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto modal-scroll bg-surface-800 rounded-2xl shadow-2xl"
      >
        {/* Accent bar */}
        <div className="h-1.5 rounded-t-2xl" style={{ backgroundColor: region.color }} />

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-white">{region.name}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-surface-700 transition-colors text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed">{region.description}</p>

          {/* Key Ingredients */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {region.keyIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-3 py-1 rounded-full text-sm border"
                  style={{ borderColor: region.color + '60', color: region.color }}
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Dishes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Signature Dishes</h3>
            <div className="space-y-3">
              {region.signatureDishes.map((dish) => (
                <div key={dish.name} className="bg-surface-900/50 rounded-xl p-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-white">{dish.name}</span>
                    <span className="text-xs text-gray-500">{dish.country}</span>
                  </div>
                  <p className="text-sm text-gray-400">{dish.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Gallery</h3>
            <PhotoGallery images={region.images} />
          </div>

          {/* Fun Fact */}
          <div className="rounded-xl p-4 border" style={{ borderColor: region.color + '40', backgroundColor: region.color + '10' }}>
            <p className="text-sm">
              <span className="font-semibold text-white">Fun fact: </span>
              <span className="text-gray-300">{region.funFact}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
