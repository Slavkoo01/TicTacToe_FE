import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../common/Form";

import './Registration.css';

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState<{
    username: string | null;
    password: string | null;
    email: string | null;
  }>({
    username: null,
    password: null,
    email: null,
  });

  const navigate = useNavigate();

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Validation logic
  const validate = () => {
    const errors: { username: string | null; password: string | null; email: string | null } = {
      username: null,
      password: null,
      email: null,
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

    if (!formData.email) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format.";
      }
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (!validationErrors.username && !validationErrors.password && !validationErrors.email) {
      alert("Registration successful!");
      navigate("/login");
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      value: formData.username,
      error: error.username,
    },
    {
      name: "password",
      label: "Password",
      value: formData.password,
      type: "password",
      error: error.password,
    },
    {
      name: "email",
      label: "Email",
      value: formData.email,
      type: "email",
      error: error.email,
    },
  ];

  return (
    <div>
      <UserForm
        fields={fields}
        formLabelText="Register"
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Register"
      />
      <div className="login-link">
        <p>
          Already have an account?{" "}
          <a href="/login" onClick={() => navigate("/login")}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
