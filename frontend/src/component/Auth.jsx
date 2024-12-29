import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import config from '../config';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // To toggle between Login and Signup
  const navigate = useNavigate(); // Initialize useNavigate
  const host = config.backendURL
  // Signup Form Data
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginError, setLoginError] = useState(''); 
  const [signupError, setSignUpError] = useState(''); 
  // Login Form Data
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes for signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Signup form submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords did't match!");
      return;
    } else if (signupData.password.length < 5) {
      alert("Password should be at least 5 characters long!");
      return;
    }
    try {

      const response = await axios.post(`${host}/user/signup`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      const token = response.data.token;
      localStorage.setItem('authToken', token); 
      localStorage.setItem("userEmail", signupData.email); // Store email in localStorage
      setTimeout(() => {
        navigate('/home'); // Navigate to Home after successful login
      }, 700);

     
    } catch (error) {
      setSignUpError('Email already exists. Please sign up with a different email.');
      setTimeout(() => {
        setSignUpError('')
      }, 2000);
      console.log('User creation failed', error);
    }
  };

  // Login form submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/user/login`, loginData);
     
       const token = response.data.token;
       localStorage.setItem('authToken', token); // Store token in localStorage
        localStorage.setItem("userEmail", loginData.email); // Store email in localStorage
        setTimeout(() => {
          navigate('/home'); // Navigate to Home after successful login
        }, 400);
   
    } catch (error) {
      setLoginError('Invalid credentials. Please check your email and password or sign up if you don&apos;t have an account.');
      setTimeout(() => {
        setLoginError('')
      }, 2000);
      console.log('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen transform transition-all duration-700 ease-out flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-xl ${isLogin ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-black'} rounded-tl-lg transition-shadow duration-300`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-xl ${!isLogin ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-black'} rounded-tr-lg transition-shadow duration-300`}
          >
            Sign Up
          </button>
        </div>

        {/* Conditional Rendering of Forms */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Login' : 'Create an Account'}
        </h2>
        {isLogin && loginError ? (
        <p className="text-red-600 text-center">{loginError}</p>
      ):  <p className="text-red-600 text-center">{signupError}</p>}
        {isLogin ? (
          // Login Form
          <form onSubmit={handleLoginSubmit} className="space-y-4 transform transition-all duration-700 ease-out">
            <div className='transform transition-all duration-700 ease-out'>
              <label className="block text-gray-600 font-medium mb-1">Enter your email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Enter your password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full  bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Enter your name</label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Enter your email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Enter your password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Confirm your password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Link to switch between Login and Sign Up */}
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline">
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
