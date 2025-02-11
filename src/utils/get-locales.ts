import 'server-only';

enum Locale {
  En = 'en'
}

const locales: Record<Locale, () => Promise<Record<string, Record<string, string>>>> = {
  en: () => import('../locales/en.json').then((module) => module.default)
};

async function getLocale(
  locale: Locale = Locale.En
): Promise<Record<string, Record<string, string>>> {
  return locales[locale]();
}

export { Locale, getLocale };