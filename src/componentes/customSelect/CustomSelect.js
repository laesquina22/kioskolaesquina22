import React, { useState } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <div
        className={`custom-select-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
        <span className={`custom-select-arrow ${isOpen ? 'down' : 'up'}`}>
        <img className='img-flecha' src='/img/img-iconos/angle-up-solid.svg' alt='icono-menos'></img>
          </span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          <li
            className="custom-select-option"
            onClick={() => handleOptionClick('')}
          >
            {placeholder}
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className="custom-select-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
