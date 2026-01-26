
import { Property, PropertyType, Furnishing, StayDuration } from '../types';

export const MOCK_HOUSES: Property[] = [
  {
    id: '1',
    title: 'Studio Lumineux au Centre de Paris',
    description: 'Charmant studio refait à neuf, idéal pour étudiant ou jeune actif. Proche de toutes commodités et du métro.',
    price: 950,
    currency: '€',
    city: 'Paris',
    country: 'France',
    type: PropertyType.STUDIO,
    furnishing: Furnishing.MEUBLE,
    duration: StayDuration.LONG,
    imageUrl: 'https://picsum.photos/seed/house1/600/400',
    images: ['https://picsum.photos/seed/house1/600/400', 'https://picsum.photos/seed/int1/600/400', 'https://picsum.photos/seed/int2/600/400'],
    owner: {
      name: 'Jean Dupont',
      phone: '+33 6 12 34 56 78',
      email: 'jean.dupont@email.com',
      avatar: 'https://picsum.photos/seed/owner1/100/100'
    }
  },
  {
    id: '2',
    title: 'Appartement T3 Familial - Lyon',
    description: 'Bel appartement spacieux avec balcon. Quartier calme et résidentiel.',
    price: 1200,
    currency: '€',
    city: 'Lyon',
    country: 'France',
    type: PropertyType.APPARTEMENT,
    furnishing: Furnishing.NON_MEUBLE,
    duration: StayDuration.LONG,
    imageUrl: 'https://picsum.photos/seed/house2/600/400',
    images: ['https://picsum.photos/seed/house2/600/400', 'https://picsum.photos/seed/int3/600/400'],
    owner: {
      name: 'Marie Lavoie',
      phone: '+33 6 87 65 43 21',
      email: 'm.lavoie@email.com',
      avatar: 'https://picsum.photos/seed/owner2/100/100'
    }
  },
  {
    id: '3',
    title: 'Chambre chez l\'habitant - Bruxelles',
    description: 'Grande chambre meublée dans une maison de maître. Cuisine partagée.',
    price: 450,
    currency: '€',
    city: 'Bruxelles',
    country: 'Belgique',
    type: PropertyType.CHAMBRE,
    furnishing: Furnishing.MEUBLE,
    duration: StayDuration.COURT,
    imageUrl: 'https://picsum.photos/seed/house3/600/400',
    images: ['https://picsum.photos/seed/house3/600/400'],
    owner: {
      name: 'Luc Lambert',
      phone: '+32 470 00 00 00',
      email: 'luc@email.be',
      avatar: 'https://picsum.photos/seed/owner3/100/100'
    }
  },
  {
    id: '4',
    title: 'Maison Contemporaine - Marrakech',
    description: 'Splendide villa avec piscine et jardin privatif. Sécurisée 24/24.',
    price: 2500,
    currency: '€',
    city: 'Marrakech',
    country: 'Maroc',
    type: PropertyType.MAISON,
    furnishing: Furnishing.MEUBLE,
    duration: StayDuration.COURT,
    imageUrl: 'https://picsum.photos/seed/house4/600/400',
    images: ['https://picsum.photos/seed/house4/600/400', 'https://picsum.photos/seed/pool/600/400'],
    owner: {
      name: 'Ahmed Benani',
      phone: '+212 600 00 00 00',
      email: 'ahmed@email.ma',
      avatar: 'https://picsum.photos/seed/owner4/100/100'
    }
  }
];
