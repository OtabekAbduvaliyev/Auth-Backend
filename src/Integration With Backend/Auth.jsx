import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(token);
    }
  }, []);
  console.log(currentUser);
  const register = async (credentials) => {
    try {
      setLoading(true)
      const response = await axios.post('https://hellomag.uz/v1/api/users/register', credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setCurrentUser(response.data.token); // Set currentUser directly
      credentials.password = '';
      credentials.name = '';
      credentials.email = '';
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
      credentials.password = '';
      credentials.name = '';
      credentials.email = '';
      setLoading(false)
      swal({
        title: "Error !",
        text: `${error}`,
        icon: "error",
        button: "ok",
      });
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true)
      const response = await axios.post('https://hellomag.uz/v1/api/users/login', credentials);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setCurrentUser(response.data.token); // Set currentUser directly
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
    } catch (error) {
      console.error('Login failed:', error);
      credentials.password = '';
      credentials.name = '';
      credentials.email = '';
      setLoading(false)
      swal({
        title: "Error occurred",
        text: `${error.response.data.message}`,
        icon: "error",
        button: "close",
      });
      handleError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
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
    <AuthContext.Provider value={{ user, currentUser, register, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
