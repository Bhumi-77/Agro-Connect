import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: "Login",
      email: "Email",
      password: "Password",
      role: "Role",
      farmer: "Farmer",
      buyer: "Buyer",
      admin: "Admin",
      signIn: "Sign In",
      switchLang: "नेपाली",
      demandBoard: "Demand Board",
      addListing: "Add Listing",
      crops: "Crops",
      chat: "Chat",
      logout: "Logout"
    }
  },
  np: {
    translation: {
      login: "लगइन",
      email: "इ-मेल",
      password: "पासवर्ड",
      role: "भूमिका",
      farmer: "कृषक",
      buyer: "खरिदकर्ता",
      admin: "प्रशासक",
      signIn: "साइन इन",
      switchLang: "English",
      demandBoard: "माग बोर्ड",
      addListing: "सूची थप्नुहोस्",
      crops: "बालीहरू",
      chat: "च्याट",
      logout: "लगआउट"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
