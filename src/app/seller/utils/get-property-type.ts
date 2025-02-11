import { PropertyType } from '../../types';
import { seller } from '../../../locales/en.json';

export function getPropertyType(type: PropertyType): string {
  const propertyTypeTranslation: Record<PropertyType, string> = {
    [PropertyType.House]: seller.house,
    [PropertyType.Apartment]: seller.apartment,
    [PropertyType.Condo]: seller.condo
  };

  return propertyTypeTranslation[type];
}
