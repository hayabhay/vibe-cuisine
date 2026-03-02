import { motion } from 'framer-motion';

interface RegionTooltipProps {
  regionName: string;
  x: number;
  y: number;
}

export default function RegionTooltip({ regionName, x, y }: RegionTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="fixed z-50 pointer-events-none px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-md bg-foreground text-background font-mono text-sm lg:text-base 2xl:text-lg tracking-wide shadow-lg"
      style={{ left: x + 12, top: y - 36 }}
    >
      {regionName}
    </motion.div>
  );
}
