import { getLocale } from '../../utils/get-locales';

import SellerForm from './widgets/seller-form';

export default async function Seller() {
  const locale = await getLocale();
  const sellerLocale = locale.seller;
  const commonLocale = locale.common;

  return (
    <main className="flex flex-col min-h-full bg-black-5 ">
      <div className="align-center justify-center flex flex-col mx-auto w-1/2">
        <h1 className="font-medium text-2xl mt-10 mb-2 text-center">{sellerLocale.title}</h1>
        <SellerForm sellerLocale={sellerLocale} commonLocale={commonLocale} />
      </div>
    </main>
  );
}
