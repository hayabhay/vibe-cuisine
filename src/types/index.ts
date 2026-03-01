export interface Dish {
  name: string;
  country: string;
  description: string;
}

export interface UnsplashImage {
  url: string;
  alt: string;
  credit: string;
}

export interface CulinaryRegion {
  id: string;
  name: string;
  description: string;
  color: string;
  hoverColor: string;
  keyIngredients: string[];
  signatureDishes: Dish[];
  images: UnsplashImage[];
  funFact: string;
}

export type CountryRegionMapping = Record<string, string>;
