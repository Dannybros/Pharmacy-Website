import React, { useState } from 'react';
import Select from 'react-select';
import laoFlag from '../../img/laoFlag.png';
import usFlag from '../../img/usFlag.png';
import { useLocalStorage } from '../../Reducer/useLocalStorage';

const options  = [
    { value: 'en', label: <div style={{color:"white"}}><img src={usFlag} height="20px" width="20px" alt=""/> &nbsp; English </div>},
    { value: 'ln', label: <div style={{color:"white"}}><img src={laoFlag} height="20px" width="20px" alt=""/> &nbsp; Lao </div>},
  ];

function Selecter() {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: "transparent",
          border:0,
          width: 150,
          "&:hover": {
            outline:0
          }
        }),
        option: (provided, state) => ({
            ...provided,
            background: state.isFocused ?"#333" : "#222",
            borderBottom: '1px dotted pink',
            padding: 20,
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

    return (
        <Select
            styles={customStyles}
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
        />
    )
}

export default Selecter