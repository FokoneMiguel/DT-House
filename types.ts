
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

export enum PaymentMethod {
  MTN_MOMO = 'MTN Mobile Money',
  ORANGE_MONEY = 'Orange Money'
}

// Fix: Added missing Furnishing enum
export enum Furnishing {
  MEUBLE = 'Meublé',
  NON_MEUBLE = 'Non meublé'
}

// Fix: Added missing StayDuration enum
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

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  propertyId?: string; // Contextuel
}

export interface Chat {
  id: string;
  participants: string[];
  propertyId: string;
  messages: Message[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  // Fix: Added missing country property
  country: string;
  neighborhood: string;
  type: PropertyType;
  // Fix: Added missing furnishing and duration properties
  furnishing?: Furnishing;
  duration?: StayDuration;
  imageUrl: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  // Fix: Added owner object definition used in mock data and property creation
  owner?: {
    name: string;
    avatar?: string;
    phone?: string;
    email?: string;
  };
  // Fix: Added isPremium property
  isPremium?: boolean;
}
