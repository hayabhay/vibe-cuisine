export interface Dish {
  name: string;
  description: string;
}

export interface UnsplashImage {
  url: string;
  alt: string;
}

export interface CulinaryRegion {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
}

export interface CountryCuisine {
  id: string;          // ISO 3166-1 numeric code
  name: string;        // Country name
  description: string;
  keyIngredients: string[];
  signatureDishes: Dish[];
  images: UnsplashImage[];
  funFact: string;
}
