import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const host = config.backendURL;
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail')
  // On component mount, trigger the animation
  useState(() => {
    setIsVisible(true);
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      // Simulate password change (replace with your logic)
      async function changePassword(){
        try{
          await axios.post(`${host}/user/changePassword`,{
             userEmail,
             oldPassword,
             newPassword
           })

        }
        catch(error){
          console.log('Error changing password',error);
          setError('Failed to change password. Please try again.');
          alert('wrong old password')
        }
      }
      changePassword().then(
        alert('password changed successfully')
      );
      // Reset the fields and hide error
      setOldPassword('');
      setNewPassword('');
      setError('');
    } else {
      setError('Please fill in both fields.');
    }
  };

  const goHome = () => {
    setTimeout(() => {  
      navigate('/home');
    }, 700);
  };

  const goUser = () => {
    setTimeout(() => {
      navigate('/user');
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-green-300 px-4">
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={goUser}
          className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
        >
          User
        </button>
        <button
          onClick={goHome}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Home
        </button>
      </div>


      <div
        className={`bg-white shadow-lg rounded-lg p-10 w-full max-w-lg transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        <form onSubmit={handleChangePassword} className="space-y-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-red-500 text-transparent bg-clip-text mb-10 text-center">
        Change Your Password
      </h1>
          <div>
            <label htmlFor="oldPassword" className="block text-lg font-semibold text-gray-700 mb-2">
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-lg font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="md:w-1/2 py-3 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
          >
            Change Password
          </button>

          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
