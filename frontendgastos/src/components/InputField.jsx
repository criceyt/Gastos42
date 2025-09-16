import React, { useState } from 'react';

const InputField = ({ type, placeholder, icon, name, value, onChange }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        required
        name={name}        // ← necesario para handleChange
        value={value}      // ← conecta con el estado
        onChange={onChange} // ← actualiza estado en cada cambio
      />
      <i className="material-symbols-outlined">{icon}</i>
      {type === 'password' && (
        <i
          onClick={() => setIsPasswordShown(prev => !prev)}
          className="material-symbols-outlined eye-icon"
        >
          {isPasswordShown ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  );
};

export default InputField;
