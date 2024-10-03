import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../common/Form";
import client from "../../utils/apolloClient";
import { useMutation, gql } from "@apollo/client";
import mapErrorMessage from "./../../utils/errorMap";
import "./Login.css";

const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
    client,
  });

  const [validationError, setvalidationError] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Validation logic
  const validate = () => {
    const validationErrors: {
      username: string | null;
      password: string | null;
    } = {
      username: null,
      password: null,
    };
    const username = formData.username.trim();
    if (!username) validationErrors.username = "Username is required.";
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameRegex.test(username) && !validationErrors.username) {
      validationErrors.username =
        "Username can only contain alphanumeric characters.";
    }

    if (!formData.password) validationErrors.password = "Password is required.";

    if (formData.password.length < 6 && !validationErrors.password) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setvalidationError(validationErrors);

    if (!validationErrors.username && !validationErrors.password) {
      try {
        console.log("Submitting login with:", formData);
        const response = await login({
          variables: {
            username: formData.username,
            password: formData.password,
          },
        });
        console.log("Login response:", response);

        const token = response.data?.loginUser?.token;
        if (token) {
          localStorage.setItem("JWT", token);
          console.log("Login successful, JWT:", token);
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Error during login:", err);
      }
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      value: formData.username,
      error: validationError.username,
    },
    {
      name: "password",
      label: "Password",
      value: formData.password,
      type: "password",
      error: validationError.password,
    },
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
        <p>Don't have an account?</p>
        <a href="/register" onClick={() => navigate("/register")}>
          Register here
        </a>
      </div>
      <div className="registration-link">
        {loading && <div className="spinner-border" role="status" />}
        {error && (
          <div className="invalid-feedback d-block text-center">
            {mapErrorMessage(error.message)}
          </div>
        )}
        {data && navigate("/dashboard", { replace: true })}
      </div>
    </div>
  );
};

export default Login;
