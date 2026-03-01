import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import WorldMap from './components/WorldMap';
import Legend from './components/Legend';
import RegionTooltip from './components/RegionTooltip';
import RegionModal from './components/RegionModal';
import { useMapInteraction } from './hooks/useMapInteraction';

export default function App() {
  const { selectedRegion, hoveredInfo, handleClick, handleHover, handleLeave, closeModal } =
    useMapInteraction();

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col items-center">
      <Header />

      <main className="w-full max-w-6xl px-4 flex-1 flex items-center justify-center">
        <WorldMap
          onRegionClick={handleClick}
          onRegionHover={handleHover}
          onRegionLeave={handleLeave}
          selectedRegionId={selectedRegion?.id ?? null}
        />
      </main>

      <Legend onRegionClick={handleClick} />

      <AnimatePresence>
        {hoveredInfo && !selectedRegion && (
          <RegionTooltip
            key="tooltip"
            regionName={hoveredInfo.region.name}
            x={hoveredInfo.x}
            y={hoveredInfo.y}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRegion && (
          <RegionModal key="modal" region={selectedRegion} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
