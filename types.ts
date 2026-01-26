
export enum PropertyType {
  CHAMBRE = 'Chambre',
  STUDIO = 'Studio',
  APPARTEMENT = 'Appartement',
  MAISON = 'Maison'
}

export enum Furnishing {
  MEUBLE = 'Meublé',
  NON_MEUBLE = 'Non meublé'
}

export enum StayDuration {
  COURT = 'Court séjour',
  LONG = 'Long séjour'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  country: string;
  type: PropertyType;
  furnishing: Furnishing;
  duration: StayDuration;
  imageUrl: string;
  images: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  isFavorite?: boolean;
}

export interface SearchFilters {
  country: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  type?: PropertyType;
  furnishing?: Furnishing;
  duration?: StayDuration;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'user' | 'admin';
}
