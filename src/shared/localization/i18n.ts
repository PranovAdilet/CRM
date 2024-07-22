import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-xhr-backend';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
}

const DETECTION_OPTIONS = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
};


i18n
    // .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection: DETECTION_OPTIONS,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;