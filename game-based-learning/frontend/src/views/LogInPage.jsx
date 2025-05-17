import React, { useState } from "react";
// require("dotenv").config();
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 60px 80px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 40px 60px;
  }

  @media (max-width: 480px) {
    padding: 20px 40px;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 18px;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);

    @media (max-width: 768px) {
      padding: 12px;
      font-size: 16px;
    }

    @media (max-width: 480px) {
      padding: 10px;
      font-size: 14px;
    }

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    padding: 5px 10px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 20px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LogInPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin@saskpolytech") {
      setError("");
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        setIsLoggedIn(true);
        navigate("/");
      }, 1000);
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <Container>
      {popupVisible && <Popup>Login Successful</Popup>}
      <LoginForm onSubmit={handleLogin}>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default LogInPage;
