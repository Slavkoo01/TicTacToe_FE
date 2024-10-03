import React from "react";
import './Style/Input.css';
interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string | null; 
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ name, label, value, onChange, type = 'text', error, placeholder = '' }) => {
  const inputClass = `form-control ${error ? 'is-invalid' : ''}`; 
  return (
    <div className="inputContainer form-group">
      <label className="inputLabel" htmlFor={name}>{label}</label>
      
        <input
          id={name}
          width={'300px'}
          type={type}
          className={inputClass}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      
      <div className="invalid-feedback"> <label>{error || ''}</label> </div>
    </div>
  );
};

export default Input;
