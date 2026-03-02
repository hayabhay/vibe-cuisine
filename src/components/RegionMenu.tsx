import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { regions } from '../data/regions';

interface RegionMenuProps {
  onRegionClick: (regionId: string) => void;
}

export default function RegionMenu({ onRegionClick }: RegionMenuProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(regionId: string) {
    setOpen(false);
    onRegionClick(regionId);
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Open region menu">
        <Menu className="w-4 h-4" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-64 p-0">
          <SheetHeader className="px-5 pt-5 pb-3">
            <SheetTitle className="font-mono text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Regions
            </SheetTitle>
          </SheetHeader>
          <Separator />
          <nav className="py-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => handleSelect(region.id)}
                className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-muted transition-colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: region.color }}
                />
                <span className="font-mono text-sm text-foreground">{region.name}</span>
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
