export type PropertyType = 'apartment' | 'house' | 'land';
export type PropertyCondition = 'to-renovate' | 'to-refresh' | 'good' | 'very-good' | 'renovated' | 'new' | 'high-end' | 'vefa';
export type EPCRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type ExteriorType = 'none' | 'garden' | 'terrace' | 'balcon';
export type OccupancyStatus = 'free' | 'occupied';
export type HouseType = 'individual' | 'individual-condo' | 'semi-detached' | 'semi-detached-condo';
export type ExposureType = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SO' | 'O' | 'NO';
export type TopographyType = 'flat' | 'steep-slope' | 'gentle-slope';
export type SanitationType = 'individual' | 'collective';
export type ServicingType = 'yes' | 'no';

export interface Property {
  id?: string;
  type: PropertyType;
  houseType?: HouseType | null;
  typology: string;
  price: number;
  saleDate: any; // Firestore Timestamp
  firstMandateDate: any; // Firestore Timestamp
  firstMandatePrice: number;
  address: string;
  city: string;
  district: string;
  parkingSpots: number;
  floor?: string | null;
  constructionYear?: string | null;
  exterior?: ExteriorType | null;
  exposure?: ExposureType | null;
  condition: PropertyCondition;
  epcElectricity: EPCRating;
  epcGes: EPCRating;
  occupancyStatus: OccupancyStatus;
  surface: number;
  plotSurface?: number;
  userId?: string;
  createdAt?: any; // Firestore Timestamp
  topography?: TopographyType;
  sanitation?: SanitationType;
  servicing?: ServicingType;
}