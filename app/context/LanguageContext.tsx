// LanguageContext.tsx
import React, { createContext, useContext, useState } from 'react';
import translations from '../public/translations';

const LanguageContext = createContext({
  language: 'English',
  setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('English');

  const changeLanguage = (lang: string) => {
    console.log(`Changing language to: ${lang}`);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};