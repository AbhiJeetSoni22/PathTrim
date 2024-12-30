import  { useState } from 'react';
import axios from 'axios';
import config from '../config';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const host = config.backendURL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logIn = async () => {
      // Handle user login
      try {
        const response = await axios.post(`${host}/user/login`, {
          email: formData.email,
          password: formData.password,
        });
        const token = response.data.token;
        localStorage.setItem('authToken', token); // Store token in localStorage

        // Redirect user to homepage or dashboard
      } catch (error) {
        console.log('User login failed', error);
      }
    };
    logIn();

    console.log('Form Data:', formData);
    // Handle your form submission logic here (e.g., API calls)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Enter your email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-purple-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
