import { memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { countryRegionMap } from '../data/countryRegionMap';
import { getRegionColor, getRegionHoverColor } from '../utils/mapHelpers';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  onRegionClick: (regionId: string) => void;
  onRegionHover: (regionId: string, x: number, y: number) => void;
  onRegionLeave: () => void;
  selectedRegionId: string | null;
}

function WorldMap({ onRegionClick, onRegionHover, onRegionLeave, selectedRegionId }: WorldMapProps) {
  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{ scale: 160, center: [0, 5] }}
      className="w-full h-auto max-w-6xl"
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryId = geo.id as string;
            const regionId = countryRegionMap[countryId];
            const fillColor = getRegionColor(countryId);
            const hoverFill = getRegionHoverColor(countryId);
            const isSelected = regionId != null && regionId === selectedRegionId;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => {
                  if (regionId) onRegionClick(regionId);
                }}
                onMouseEnter={(e) => {
                  if (regionId) {
                    const { clientX, clientY } = e;
                    onRegionHover(regionId, clientX, clientY);
                  }
                }}
                onMouseMove={(e) => {
                  if (regionId) {
                    const { clientX, clientY } = e;
                    onRegionHover(regionId, clientX, clientY);
                  }
                }}
                onMouseLeave={onRegionLeave}
                style={{
                  default: {
                    fill: isSelected ? hoverFill : fillColor,
                    stroke: '#0F172A',
                    strokeWidth: 0.5,
                    outline: 'none',
                  },
                  hover: {
                    fill: hoverFill,
                    stroke: '#0F172A',
                    strokeWidth: 0.75,
                    outline: 'none',
                    cursor: regionId ? 'pointer' : 'default',
                  },
                  pressed: {
                    fill: hoverFill,
                    stroke: '#0F172A',
                    strokeWidth: 0.75,
                    outline: 'none',
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

export default memo(WorldMap);
