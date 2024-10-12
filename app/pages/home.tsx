'use client'

import Navbar from '../components/navbar';
import translations from '../public/locals/translations'
import LanguageTranslations from '../public/locals/translations_type'

import {
    useState,
    useEffect
} from 'react';

export default function Home() {
  const [lng, setlng] = useState<LanguageTranslations>(translations['English'])

  return (
    <div>
        <Navbar translations={translations} lng={lng} setlng={setlng} />
    </div>
  )
}
