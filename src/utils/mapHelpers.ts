import { regions } from '../data/regions';
import { countries } from '../data/countries';
import { countryRegionMap } from '../data/countryRegionMap';
import type { CulinaryRegion, CountryCuisine } from '../types';

const DEFAULT_COLOR = '#1E293B';
const DEFAULT_HOVER_COLOR = '#334155';

export function getRegionForCountry(countryId: string): CulinaryRegion | undefined {
  const regionId = countryRegionMap[countryId];
  if (!regionId) return undefined;
  return regions.find((r) => r.id === regionId);
}

export function getRegionColor(countryId: string): string {
  const region = getRegionForCountry(countryId);
  return region?.color ?? DEFAULT_COLOR;
}

export function getRegionHoverColor(countryId: string): string {
  const region = getRegionForCountry(countryId);
  return region?.hoverColor ?? DEFAULT_HOVER_COLOR;
}

export function getRegionById(regionId: string): CulinaryRegion | undefined {
  return regions.find((r) => r.id === regionId);
}

export function getCountryCuisine(countryId: string): CountryCuisine | undefined {
  return countries[countryId];
}

export function hasCountryData(countryId: string): boolean {
  return !!countries[countryId];
}
