'use client'

import Dropdown from './dropdown';
import {
  useState 
} from 'react'

export default function Navbar({ translations, lng, setlng }) {

  return (

        <nav className='flex w-100 p-5 justify-evenly gap-16 [&>*]:flex'>
            <div className=''>{lng.navbarTitle}</div>
            <ul className='gap-16'>
                <li className=''><Dropdown translations={translations} lng={lng} setlng={setlng}/></li>
            </ul>
        </nav>
  )
}
