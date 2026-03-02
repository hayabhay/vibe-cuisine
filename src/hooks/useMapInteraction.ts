import { useState, useCallback } from 'react';
import type { CountryCuisine } from '../types';
import { getCountryCuisine } from '../utils/mapHelpers';

interface HoveredInfo {
  name: string;
  x: number;
  y: number;
}

export function useMapInteraction() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCuisine | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<HoveredInfo | null>(null);

  const handleClick = useCallback((countryId: string) => {
    const country = getCountryCuisine(countryId);
    if (country) setSelectedCountry(country);
  }, []);

  const handleHover = useCallback((name: string, x: number, y: number) => {
    setHoveredInfo({ name, x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredInfo(null);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  return {
    selectedCountry,
    hoveredInfo,
    handleClick,
    handleHover,
    handleLeave,
    closeModal,
  };
}
