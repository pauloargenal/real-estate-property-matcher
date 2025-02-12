'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { BuyerFilters, PropertyType, PropertiesResponse, BuyerRequest } from '../../types';
import BuyerService from '../../../services/buyer-service';
import Card from '../../../components/card';
import Snackbar from '../../../components/snackbar';

import BuyerForm from './buyer-form';

interface buyerLayoutProps {
  buyerLocale: Record<string, string>;
  commonLocale: Record<string, string>;
}

const DEFAULT_FILTERS: BuyerFilters = {
  location: '',
  price: ''
};

export default function BuyerLayout({ buyerLocale, commonLocale }: buyerLayoutProps) {
  const [filters, setFilters] = useState<BuyerFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestErrorMessage, setRequestErrorMessage] = useState<string>('');
  const [properties, setProperties] = useState<PropertiesResponse[]>();

  const getProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: BuyerRequest = {
        location: filters?.location || '',
        price: filters?.price || '',
        propertyType: (filters?.propertyType as PropertyType) || ''
      };

      const response = await BuyerService.getProperties(params);
      if (response.data && response.data.length !== 0) {
        setProperties(response.data);
      } else {
        setProperties([]);
      }
    } catch (_) {
      setProperties([]);
      setRequestErrorMessage(buyerLocale['request.error.generic']);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyerLocale]);

  const handleFilters = useCallback((filters: BuyerFilters) => {
    setFilters(filters);
  }, []);

  const filteredProperties = useMemo(() => {
    return properties
      ?.filter((property) => {
        const matchesLocation = filters.location
          ? property.location.toLowerCase().includes(filters.location.toLowerCase())
          : true;
        const matchesPrice = filters.price
          ? parseFloat(String(property.price)) <= parseFloat(filters.price)
          : true;
        const matchesType = filters.propertyType
          ? property.propertyType === filters.propertyType
          : true;

        return matchesLocation && matchesPrice && matchesType;
      })
      .sort(
        (priceA, priceB) => parseFloat(String(priceA.price)) - parseFloat(String(priceB.price))
      );
  }, [filters, properties]);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  return (
    <>
      {isLoading && (
        <div className="text-2xl text-center font-medium flex flex-col justify-center h-screen w-auto">
          {commonLocale.loading}
        </div>
      )}

      <BuyerForm
        sellerLocale={buyerLocale}
        commonLocale={commonLocale}
        handleFilters={handleFilters}
        isLoading={isLoading}
      />
      {filteredProperties?.length === 0 && (
        <div className="text-2xl text-center font-medium flex flex-col justify-center h-screen w-auto">
          {buyerLocale['response.empty']}
        </div>
      )}
      {requestErrorMessage && (
        <div id="request-error">
          <Snackbar message={requestErrorMessage} type="error" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4">
        {filteredProperties?.map((property) => (
          <Card
            key={`${property.title}`}
            title={property.title}
            price={String(property.price)}
            location={property.location}
            type={property.propertyType}
            buyerLocale={buyerLocale}
          />
        ))}
      </div>
    </>
  );
}
