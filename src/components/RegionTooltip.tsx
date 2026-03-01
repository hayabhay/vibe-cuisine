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
      transition={{ duration: 0.15 }}
      className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-surface-800 border border-surface-600 text-sm text-white font-medium shadow-lg"
      style={{ left: x + 12, top: y - 32 }}
    >
      {regionName}
    </motion.div>
  );
}
