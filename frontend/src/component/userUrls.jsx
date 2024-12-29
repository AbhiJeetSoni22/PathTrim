import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
const UserUrls = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);

  const host = config.backendURL;
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    
    async function getURls() {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

        if (!token) {
        
          console.error('Authentication token not found');
          return;
        }
    
        const response = await axios.post(`${host}/userUrl/getUrls`, {
          email: userEmail},{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUrls(response.data.urls); // Ensure response.data contains the array of URLs
      } catch (error) {
        console.error("Error fetching URLs:", error);
        navigate('/')
      }
    }
    getURls();
  }, []);

  const goHome = () => {
    setTimeout(() => {
      navigate('/home');
    }, 700);
  };

  const goChangePassword = () => {
    setTimeout(() => {
      navigate('/changePassword');
    }, 700);
  };

  const handleDeleteUrls = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete your all saved URLs ? "
      );
      if (confirm) {
      await axios.post(`${host}/userUrl/deleteUrls`, {
        email: userEmail,
      });
      setTimeout(() => {
        
        setUrls([]); // Clear the URLs locally after deletion
      }, 500);

    }} catch (error) {
      console.error("Error deleting URLs:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete your account? "
      );
      if (confirm) {
        await axios.post(`${host}/user/deleteUserAccount`, {
          email: userEmail,
        });
        localStorage.removeItem('userEmail'); // Clear user email from local storage
        localStorage.removeItem('authToken')
        navigate('/'); // Redirect to signup page
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen transform transition-all duration-700 ease-out flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-300 p-4 relative">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-6 transform transition-all duration-700 ease-out">
        {/* Card Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">User Email</h2>
          <p className="text-lg text-gray-600">{userEmail}</p>
        </div>

        {/* User URLs */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Saved URLs</h3>
          {urls.length > 0 ? (
            <div className="max-h-64 overflow-y-scroll border border-gray-300 rounded-lg p-2">
              <ul className="pl-5 space-y-2 list-disc">
                {urls.map((url) => (
                  <li key={url._id} className="text-gray-800">
                    <span className="font-semibold block">Long URL:</span>{" "}
                    <a
                      href={url.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {url.longUrl}
                    </a>{" "}
                    <span className="font-semibold block">Short URL:</span>{" "}
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 underline"
                    >
                      {url.shortUrl}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">No URLs available.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          {
            urls.length > 0 && (

          <button
            className="bg-red-400 text-white w-full py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
            onClick={handleDeleteUrls}
          >
            Delete All URLs
          </button>
            )
          }
          <button
            className="bg-red-600 text-white w-full py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            onClick={handleDeleteAccount}
          >
            Delete User Account
          </button>
        </div>
      </div>

      {/* Change Password and Home Buttons */}
      <div className="absolute top-4 right-4 space-x-4">
        <button
          className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
          onClick={goHome}
        >
          Home
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={goChangePassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UserUrls;
