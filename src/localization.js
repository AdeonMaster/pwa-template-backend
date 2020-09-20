import { LANG } from './constants';
import enDictionary from './locale/en.locale';
import roDictionary from './locale/ro.locale';
import ruDictionary from './locale/ru.locale';

const localizationLibrary = {
  [LANG.EN]: enDictionary,
  [LANG.RO]: roDictionary,
  [LANG.RU]: ruDictionary,
};

export default localizationLibrary;

export const getLocalizedString = (lang, path) => {
  if (!localizationLibrary[lang]) {
    return `Unsupported language "${lang}"`;
  }

  if (localizationLibrary[lang][path] === undefined) {
    return `Unknown dictionary path "${path}"`;
  }

  if (!localizationLibrary[lang][path]) {
    return `Dictionary path "${path}" exists but is empty`;
  }

  return localizationLibrary[lang][path];
};
