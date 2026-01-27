
export enum PropertyType {
  CHAMBRE = 'Chambre',
  STUDIO = 'Studio',
  APPARTEMENT = 'Appartement',
  MAISON = 'Maison',
  VILLA = 'Villa'
}

export enum UserRole {
  TENANT = 'Locataire',
  OWNER = 'Propriétaire'
}

export enum Furnishing {
  MEUBLE = 'Meublé',
  NON_MEUBLE = 'Non meublé'
}

export enum StayDuration {
  SHORT = 'Court séjour',
  LONG = 'Long séjour'
}

export interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  dob?: string;
  location?: UserLocation;
  isVerified: boolean;
  cniUrl?: string;
  balance?: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  country: string;
  neighborhood: string;
  type: PropertyType;
  furnishing?: Furnishing;
  duration?: StayDuration;
  imageUrl: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  owner?: {
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
  };
  isPremium?: boolean;
}
