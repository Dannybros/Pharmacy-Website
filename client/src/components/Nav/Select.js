import React, { useState } from 'react';
import Select from 'react-select';
import laoFlag from '../../img/laoFlag.png';
import usFlag from '../../img/usFlag.png';
import {useTranslation} from 'react-i18next'
import {useStateValue } from '../../Reducer/StateProvider';

const options  = [
    { value: 'en', label: <div style={{color:"white"}}><img src={usFlag} height="20px" width="20px" alt=""/> &nbsp; English </div>},
    { value: 'la', label: <div style={{color:"white"}}><img src={laoFlag} height="20px" width="20px" alt=""/> &nbsp; Lao </div>},
  ];

function Selector() {
    
  const {i18n} = useTranslation();

  const [{lang}, dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState(lang==="en"? options[0] : options[1]);

  const customStyles = {
      control: (provided, state) => ({
        ...provided,
        background: "transparent",
        border:0,
        width: 124,
        "&:hover": {
          outline:0
        }
      }),
      option: (provided, state) => ({
          ...provided,
          background: state.isFocused ?"#333" : "#222",
          borderBottom: '1px dotted pink',
          padding: 15,
      }),
      menu: (base) => ({
          ...base,
          borderRadius: 0,
          marginTop: 0,
      }),
      menuList: (base) => ({
      ...base,
      padding: 0
      }),

      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
    
        return { ...provided, opacity, transition };
      }
  }

  const handleLangChange=(e)=>{
    const newLang = e.value;
    setSelectedOption(e)
    console.log(e.value);

    dispatch({
        type:'SWITCH_LANG',
        lang: newLang,
    });
    i18n.changeLanguage(newLang)
  }

  return (
      <Select
          styles={customStyles}
          value={selectedOption}
          onChange={handleLangChange}
          options={options}
      />
  )
}

export default Selector