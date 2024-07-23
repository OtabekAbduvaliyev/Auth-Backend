import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import instance from './Components/Intance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [token,setToken] = useState(null)
    const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  console.log(token);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(token);
    }
  }, []);

  const register = async (credentials) => {
    try {
      setLoading(true)
      const response = await instance.post('/auth/register', credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.token); // Set currentUser directly
      setToken(response.data.token)
      credentials.password = '';
      navigate('/');
      swal({
        title: "Success !",
        text: "Your account created successfully",
        icon: "success",
        button: "close",
      });
      setLoading(false)
    } catch (error) {
      console.error('Registration failed:', error);
      handleError(error);
      setLoading(false)
      swal({
        title: "Error !",
        text: `${error.response.data.message}`,
        icon: "error",
        button: "ok",
      });
    }
  };
  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await instance.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.token); // Set currentUser directly
      setToken(response.data.token)
      console.log(response);
      credentials.password = '';
      credentials.name = '';
      credentials.email = '';
      navigate('/');
      swal({
        title: "Success !",
        text: "You logged in successfully",
        icon: "success",
        button: "close",
      });
      setLoading(false)
    } catch (error) {
      console.error('Login failed:', error);
      credentials.password = '';
      credentials.name = '';
      credentials.email = '';
      swal({
        title: "Error occurred",
        text: `${error.response.data.message}`,
        icon: "error",
        button: "close",
      });
      handleError(error);
      setLoading(false)
    }
  };
  const changePassword = async (credentials) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Sending token:', token); // Debug log
      console.log(credentials);
      const response = await instance.put('/auth/change-password', credentials, {
        headers: {
          Authorization: token
        }
      });
      localStorage.setItem('token', response.data.token);
      console.log(response.data.message);
      console.log(response);
    } catch (error) {
      console.log('Error details:', error.response); // Debug log
      handleError(error);
    }
  };
  const update = async (credentials) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Sending token:', token); // Debug log
      console.log(credentials);
      const response = await instance.put('/auth', credentials, {
        headers: {
          Authorization: token
        }
      });
      console.log(response.data.message);
      console.log(response);
    } catch (error) {
      console.log('Error details:', error.response); // Debug log
      handleError(error);
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(''); // Clear currentUser
    swal({
      title: "Logged Out",
      text: "You logged out successfully",
      icon: "info",
      button: "close",
    });
  };
  const handleError = (error) => {
    if (error.response) {
      console.error('Server responded with status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ currentUser, register, logout, login, userData, loading,changePassword,update}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
