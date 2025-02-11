import { PropertyType } from '../app/types';
import { getPropertyType } from '../app/seller/utils/get-property-type';
import getImgUrl from '../app/utils/get-img-url';

interface CardProps {
  title: string;
  price: string;
  location: string;
  type: PropertyType;
  buyerLocale: Record<string, string>;
}

export default function Card({ title, price, location, type, buyerLocale }: CardProps) {
  const locationText = `${buyerLocale.location}: ${location}`;
  const propertyType = getPropertyType(type);
  const typeText = `${buyerLocale.type}: ${propertyType}`;
  const imgUrl = getImgUrl(type);
  const priceText = `$${price}`;

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="h-48 w-full overflow-hidden rounded-t-lg">
        <img className="w-full h-full object-cover" src={imgUrl} alt={title} />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h5 className="font-medium text-2xl">{title}</h5>
        <span className="text-2xl font-bold">{priceText}</span>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">{locationText}</span>
          <span className="text-sm text-gray-300">{typeText}</span>
        </div>
      </div>
    </div>
  );
}
