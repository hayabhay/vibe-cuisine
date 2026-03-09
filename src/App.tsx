import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WorldMap from './components/WorldMap';
import RegionTooltip from './components/RegionTooltip';
import RegionModal from './components/RegionModal';
import { useMapInteraction } from './hooks/useMapInteraction';
import { useTheme } from './hooks/useTheme';
import { useScrollDrag } from './hooks/useScrollDrag';

export default function App() {
  const { selectedCountry, hoveredInfo, handleClick, handleHover, handleLeave, closeModal } =
    useMapInteraction();
  const { isDark, toggle } = useTheme();
  const { containerRef, isDraggingRef, dragHandlers } = useScrollDrag();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    });
  }, [containerRef]);

  function handleSidebarCountryClick(countryId: string) {
    if (window.innerWidth < 1024) setSidebarOpen(false);
    handleClick(countryId);
  }

  return (
    <div className="h-screen bg-background overflow-hidden flex">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onToggleSidebar={() => setSidebarOpen((o) => !o)} />

        <main
          ref={containerRef}
          className="map-container flex-1 min-h-0 overflow-x-auto overflow-y-hidden"
          style={{ backgroundColor: 'var(--ocean)' }}
          {...dragHandlers}
        >
          <WorldMap
            onCountryClick={handleClick}
            onCountryHover={handleHover}
            onCountryLeave={handleLeave}
            selectedCountryId={selectedCountry?.id ?? null}
            isDark={isDark}
            isDraggingRef={isDraggingRef}
          />
        </main>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar
        isOpen={sidebarOpen}
        onCountryClick={handleSidebarCountryClick}
        onClose={() => setSidebarOpen(false)}
        isDark={isDark}
        onToggleTheme={toggle}
      />

      <AnimatePresence>
        {hoveredInfo && !selectedCountry && (
          <RegionTooltip
            key="tooltip"
            regionName={hoveredInfo.name}
            x={hoveredInfo.x}
            y={hoveredInfo.y}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCountry && (
          <RegionModal key="modal" country={selectedCountry} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}
