import { PropertyType } from './common';

export enum SellerSubmitError {
  Generic = 'GENERIC',
  Title = 'TITLE_ID',
  Location = 'LOCATION_ID',
  Price = 'PRICE_ID'
}

export interface PropertySelectBody {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SellerRequest {
  title: string;
  location: string;
  price: number;
  propertyType: PropertyType;
}

export interface PropertiesResponse {
  title: string;
  location: string;
  price: number;
  propertyType: PropertyType;
}
