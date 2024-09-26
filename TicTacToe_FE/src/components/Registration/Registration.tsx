import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../common/Form";
import client from '../../utils/apolloClient';
import { useMutation, gql } from "@apollo/client";
import mapErrorMessage from '../../utils/errorMap';
import './Registration.css';


const REGISTRATION_MUTATION = gql`
    mutation register($username: String!, $email: String!, $password: String!){
        registerUser(username: $username, email: $email, password: $password){
            token
        }
    }
`;

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [register, { data, error, loading }] = useMutation(REGISTRATION_MUTATION, { client });
  const [validateError, setvalidateError] = useState<{
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
    const validateErrors: { username: string | null; password: string | null; email: string | null } = {
      username: null,
      password: null,
      email: null,
    };

    if (!formData.username) validateErrors.username = "Username is required.";
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(formData.username) && !validateErrors.username) {
      validateErrors.username = "Username can only contain alphanumeric characters.";
    }
    
    if (!formData.password) validateErrors.password = "Password is required.";
    if (formData.password.length < 6 && !validateErrors.password) {
        validateErrors.password = "Password must be at least 6 characters long.";
    }
    
    if (!formData.email) validateErrors.email = "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) && !validateErrors.email) {
      validateErrors.email = "Invalid email format.";
    }
    

    return validateErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setvalidateError(validationErrors);

    if (!validationErrors.username && !validationErrors.password && !validationErrors.email) {
      
        try {
            const response = await register({
                variables: {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                },
            });
            const token = response.data?.registerUser?.token;
            if(token){
                localStorage.setItem('JWT', token);
                console.log('Register successful, JWT:', token);
            }
        } catch (err) {
            console.error('Error during registration:', err);
        }
    }
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      value: formData.username,
      error: validateError.username,
    },
    {
      name: "password",
      label: "Password",
      value: formData.password,
      type: "password",
      error: validateError.password,
    },
    {
      name: "email",
      label: "Email",
      value: formData.email,
      type: "email",
      error: validateError.email,
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
      <div className="login-link">
        {loading && (<div className="spinner-border" role="status"/>)}
        {error && (<div className="invalid-feedback d-block text-center">{mapErrorMessage(error.message)}</div>)}
        {data && navigate("/", { replace: true })}
      </div>
    </div>
  );
};

export default Registration;
