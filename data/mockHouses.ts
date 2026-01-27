
import { Property, PropertyType, Furnishing, StayDuration } from '../types';

export const MOCK_HOUSES: Property[] = [
  {
    id: 'h1',
    title: 'Appartement de Luxe - Bastos',
    description: 'Magnifique appartement situé au cœur de Bastos, sécurisé avec groupe électrogène et forage.',
    price: 450000,
    currency: 'FCFA',
    city: 'Yaoundé',
    country: 'Cameroun',
    neighborhood: 'Bastos',
    type: PropertyType.APPARTEMENT,
    furnishing: Furnishing.MEUBLE,
    duration: StayDuration.LONG,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
    ownerId: 'owner1',
    ownerName: 'Samuel Eto\'o',
    owner: {
      name: 'Samuel Eto\'o',
      avatar: 'https://i.pravatar.cc/150?u=sam',
      phone: '+237 600 000 001',
      email: 'setoo@legend.cm'
    },
    isPremium: true
  },
  {
    id: 'h2',
    title: 'Studio Moderne - Bonapriso',
    description: 'Studio meublé tout confort à Bonapriso, proche des restaurants et commerces.',
    price: 250000,
    currency: 'FCFA',
    city: 'Douala',
    country: 'Cameroun',
    neighborhood: 'Bonapriso',
    type: PropertyType.STUDIO,
    furnishing: Furnishing.MEUBLE,
    duration: StayDuration.LONG,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    ownerId: 'owner2',
    ownerName: 'Nathalie Koah',
    owner: {
      name: 'Nathalie Koah',
      avatar: 'https://i.pravatar.cc/150?u=nath',
      phone: '+237 600 000 002',
      email: 'nkoah@business.cm'
    }
  },
  {
    id: 'h3',
    title: 'Villa avec Piscine - Ngousso',
    description: 'Grande villa familiale idéale pour expatriés. 4 chambres, grand jardin.',
    price: 800000,
    currency: 'FCFA',
    city: 'Yaoundé',
    country: 'Cameroun',
    neighborhood: 'Ngousso',
    type: PropertyType.VILLA,
    furnishing: Furnishing.NON_MEUBLE,
    duration: StayDuration.LONG,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    ownerId: 'owner1',
    ownerName: 'Samuel Eto\'o',
    owner: {
      name: 'Samuel Eto\'o',
      avatar: 'https://i.pravatar.cc/150?u=sam',
      phone: '+237 600 000 001',
      email: 'setoo@legend.cm'
    }
  }
];
