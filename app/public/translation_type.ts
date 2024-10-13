// types.ts
export interface Translations {
  navbarTitle: string;
  selectLanguage: string;
  title: string;
  uploadPhoto: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  selectDistrict: string;
  selectTaluka: string;
  selectBranch: string;
  message: string;
  submit: string;
  copyright: string;
}

export interface LanguageTranslations {
  [key: string]: Translations; 
}
