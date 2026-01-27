
export enum PropertyType {
  CHAMBRE = 'Chambre',
  STUDIO = 'Studio',
  APPARTEMENT = 'Appartement',
  MAISON = 'Maison',
  VILLA = 'Villa'
}

// Fix missing enums needed for Property interface and AddListingView
export enum Furnishing {
  MEUBLE = 'Meublé',
  NON_MEUBLE = 'Non meublé'
}

export enum StayDuration {
  SHORT = 'Court séjour',
  LONG = 'Long séjour'
}

export enum UserRole {
  TENANT = 'Locataire',
  OWNER = 'Propriétaire'
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  participants: string[];
  propertyId: string;
  lastMessage?: string;
  messages: Message[];
}

export interface Transaction {
  id: string;
  propertyId: string;
  amount: number;
  commission: number;
  status: 'pending' | 'completed';
  date: number;
}

// New interface for owner details in property context
export interface PropertyOwner {
  name: string;
  avatar: string;
  phone?: string;
  email?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  country: string; // Added missing field
  neighborhood: string;
  type: PropertyType;
  furnishing: string; // Added missing field
  duration: string; // Added missing field
  imageUrl: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  owner: PropertyOwner; // Added missing object field
  isPremium?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  balance?: number;
}
