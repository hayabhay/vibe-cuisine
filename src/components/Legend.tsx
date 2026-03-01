import { regions } from '../data/regions';

interface LegendProps {
  onRegionClick: (regionId: string) => void;
}

export default function Legend({ onRegionClick }: LegendProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 px-4 pb-8 max-w-5xl mx-auto">
      {regions.map((region) => (
        <button
          key={region.id}
          onClick={() => onRegionClick(region.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors text-sm text-gray-300 hover:text-white cursor-pointer border border-surface-600 hover:border-surface-600/80"
        >
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: region.color }}
          />
          {region.name}
        </button>
      ))}
    </div>
  );
}
