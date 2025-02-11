import { PropertyType } from './common';

export interface BuyerFilters {
  location?: string;
  price?: string;
  propertyType?: PropertyType;
}

export interface BuyerRequest {
  location?: string;
  price?: string;
  propertyType?: PropertyType;
}
