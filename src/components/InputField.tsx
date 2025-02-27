import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", name, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}:</label>
      <input 
        type={type}
        name={name}
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
