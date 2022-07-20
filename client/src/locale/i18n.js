import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common_en from './en/common.json'
import common_la from './la/common.json'

const tempLang = localStorage.getItem('Medicine-Shop-Lang')

let lang = 'en'

if(tempLang){
    lang = tempLang
}

i18n.use(initReactI18next)
    .init({
        lng:lang,
        interpolation:{
            escapeValue:false,
        },
        resources:{
            en:{
                translation:common_en
            },
            la:{
                translation:common_la
            },
        },
    });

export default i18n;