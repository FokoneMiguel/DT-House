
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

export enum VerificationStatus {
  NOT_VERIFIED = 'NON_VERIFIE',
  PENDING = 'EN_ATTENTE',
  VERIFIED = 'VERIFIE',
  REJECTED = 'REJETE'
}

// Added Furnishing enum to support property listing details
export enum Furnishing {
  MEUBLE = 'Meublé',
  NON_MEUBLE = 'Non Meublé'
}

// Added StayDuration enum to support property listing details
export enum StayDuration {
  COURT = 'Court séjour',
  LONG = 'Long séjour'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  verificationStatus: VerificationStatus;
  phone?: string;
  kycDetails?: {
    cniUrl?: string;
    faceUrl?: string;
    submittedAt?: string;
  };
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  tenantId: string;
  ownerId: string;
  propertyId: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  country?: string; // Added optional country field
  neighborhood: string;
  type: PropertyType;
  furnishing?: Furnishing; // Added optional furnishing field
  duration?: StayDuration; // Added optional duration field
  imageUrl: string;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  isRented: boolean;
}
