import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../common/Form"; 
import './Login.css'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  
  const [error, setError] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null
  });

  const navigate = useNavigate();

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Validation logic
  const validate = () => {
    const errors: { username: string | null; password: string | null } = {
      username: null,
      password: null
    };

    if (!formData.username) errors.username = "Username is required.";
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameRegex.test(formData.username) && !errors.username) {
        errors.username = "Username can only contain alphanumeric characters.";
    }

    if (!formData.password) errors.password = "Password is required.";

    if (formData.password.length < 6 && !errors.password) {
        errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (!validationErrors.username && !validationErrors.password) {
      alert("Login successful!");
      navigate("/");
    }
  };

 
  const fields = [
    {
      name: "username",
      label: "Username",
      value: formData.username,
      error: error.username
    },
    {
      name: "password",
      label: "Password",
      value: formData.password,
      type: "password",
      error: error.password
    }
  ];

  return (
    <div>
      <UserForm
        fields={fields}
        formLabelText="Login"
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Login"
      />
      <div className="registration-link">
        <p>
          Don't have an account? 
        </p>
          <a href="/register" onClick={() => navigate("/register")}>
            Register here
          </a>
      </div>
    </div>
  );
};

export default Login;
