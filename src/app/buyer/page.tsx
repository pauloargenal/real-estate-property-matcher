import { getLocale } from '../../utils/get-locales';

import BuyerLayout from './widgets/buyer-layout';

export default async function Buyer() {
  const locale = await getLocale();
  const buyerLocale = locale.buyer;
  const commonLocale = locale.common;

  return (
    <main className="flex flex-col min-h-full bg-black-5 ">
      <div className="align-center justify-center flex flex-col">
        <h1 className="font-medium text-2xl mt-10 mb-2 text-center">{buyerLocale.title}</h1>
        <BuyerLayout buyerLocale={buyerLocale} commonLocale={commonLocale} />
      </div>
    </main>
  );
}
