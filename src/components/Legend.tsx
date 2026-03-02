import { regions } from '../data/regions';
import { Button } from '@/components/ui/button';

interface LegendProps {
  onRegionClick: (regionId: string) => void;
}

export default function Legend({ onRegionClick }: LegendProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 px-6 py-2 border-b border-border shrink-0">
      {regions.map((region) => (
        <Button
          key={region.id}
          variant="ghost"
          size="sm"
          onClick={() => onRegionClick(region.id)}
          className="font-mono text-xs lg:text-sm 2xl:text-base text-muted-foreground hover:text-foreground h-7 lg:h-8 2xl:h-9 px-2.5 gap-2"
        >
          <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: region.color }} />
          {region.name}
        </Button>
      ))}
    </div>
  );
}
