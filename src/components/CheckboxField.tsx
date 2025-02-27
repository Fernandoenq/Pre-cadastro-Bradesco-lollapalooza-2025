import React from "react";

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, name, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input 
          type="checkbox" 
          name={name} 
          checked={checked} 
          onChange={onChange} 
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxField;
