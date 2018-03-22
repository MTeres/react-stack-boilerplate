import EN from '../locales/en';
import FR from '../locales/fr';
import PT from '../locales/pt';

const INTL_UPDATE = 'INTL_UPDATE';

export const types = { INTL_UPDATE };

export function updateCurrentLang(lang) { // eslint-disable-line
  return {
    type: INTL_UPDATE,
    payload: { lang },
    error: false,
  };
}

const defaultState = {
  current: 'pt',
  locales: ['en', 'fr', 'pt'],
  messages: {
    en: EN,
    fr: FR,
    pt: PT,
  },
};

export default function intlReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case types.INTL_UPDATE: {
      return {
        ...state,
        current: payload.lang,
      };
    }
    default:
      return state;
  }
}
