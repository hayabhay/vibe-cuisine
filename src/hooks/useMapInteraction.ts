import { useState, useCallback } from 'react';
import type { CulinaryRegion } from '../types';
import { getRegionById } from '../utils/mapHelpers';

interface HoveredInfo {
  region: CulinaryRegion;
  x: number;
  y: number;
}

export function useMapInteraction() {
  const [selectedRegion, setSelectedRegion] = useState<CulinaryRegion | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<HoveredInfo | null>(null);

  const handleClick = useCallback((regionId: string) => {
    const region = getRegionById(regionId);
    if (region) setSelectedRegion(region);
  }, []);

  const handleHover = useCallback((regionId: string, x: number, y: number) => {
    const region = getRegionById(regionId);
    if (region) setHoveredInfo({ region, x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredInfo(null);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedRegion(null);
  }, []);

  return {
    selectedRegion,
    hoveredInfo,
    handleClick,
    handleHover,
    handleLeave,
    closeModal,
  };
}
