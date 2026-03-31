import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

const initI18n = async () => {
  let savedLanguage = null;

  if (!i18n.isInitialized) {
    const locale = Localization.getLocales()[0]?.languageTag ?? 'en';
    const initialLang = locale.startsWith('pt') ? 'pt' : 'en';

    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: initialLang,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });
  }
};

initI18n();

export default i18n;
