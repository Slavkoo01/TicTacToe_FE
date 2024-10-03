import React from "react";
import Input from "./Input";
import "./Style/Form.css";

interface FieldConfig {
  name: string;
  label: string;
  value: string;
  type?: string;
  error: string | null;
}

interface UserFormProps {
  fields: FieldConfig[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  formLabelText: string;
}

const UserForm: React.FC<UserFormProps> = ({
  fields,
  onChange,
  onSubmit,
  buttonText,
  formLabelText
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-container">
        <div className="label-container">
          <label className="formLabel">{formLabelText}</label>
        </div>
        {fields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            label={field.label}
            value={field.value}
            type={field.type || "text"}
            onChange={onChange}
            error={field.error}
          />
        ))}
        <div className="button-container">
          <button className="loginBtn btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
