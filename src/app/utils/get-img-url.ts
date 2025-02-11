import { PropertyType } from '../types/seller-types';

// Hardcoding img urls for displaying in the page for now
export default function getImgUrl(type: PropertyType): string | undefined {
  const propertyTypeTranslation: Record<PropertyType, string> = {
    [PropertyType.House]:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=3078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    [PropertyType.Apartment]:
      'https://plus.unsplash.com/premium_photo-1734549547939-41f90fdf91cf?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    [PropertyType.Condo]:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  return propertyTypeTranslation[type];
}
