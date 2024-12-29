import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import config from "../config";
import { jwtDecode } from "jwt-decode"; 
const Home = () => {
  const navigate = useNavigate();

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [isShort,setIsShort] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSave] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const host = config.backendURL;
  
  useEffect(() => {
    const checkTokenValidity = () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Current time in seconds
          
          if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem("authToken");
            navigate("/"); // Redirect to login
          } else {
            console.log("Token is valid");
          }
        } else {
          console.log("Token not found");
          navigate("/"); // Redirect to login
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/"); // Redirect on error
      }
    };

    checkTokenValidity();
    setIsVisible(true);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const getUrl = async () => {
      try {
        const response = await axios.post(`${host}/url`, { url: longUrl });       
        setShortUrl(response.data.ID);       
        setIsCopied(false); // Reset copy status
        setIsShort(true)
      } catch (error) {
        navigate('/')
        console.error("Cannot get URL", error);
        alert("Cannot get URL")
    
      }
    };
    //send url to the server to store it for display in the user page
    getUrl()

  };
  const fullShortUrl = `${host}/url/${shortUrl}`;
 
  const sendUrl = async ()=>{
    try {
    // getting email of the user
      const userEmail = localStorage.getItem('userEmail');
     
      await axios.post(
        `${host}/userUrl/sendUrls`,{
         email: userEmail,
         shortUrl:fullShortUrl,
         longUrl
        }
      )
      setIsSave(true);
      setTimeout(() => setIsSave(false), 700);
    } catch (error) {
      console.error("Cannot send URL", error);

    }
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 700); // Reset after 2 seconds
  };
  const goToUser = () => {
    setTimeout(() => {
      navigate("/user");
    }, 700);
    
  };

  const logout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("authToken")
    setTimeout(() => {
      navigate("/");
    }, 700);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-green-300 px-4">
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={goToUser}
          className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
        >
          User
        </button>
        <button
          onClick={logout}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-red-500 text-transparent bg-clip-text mb-10 text-center">
        Short Your URL
      </h1>
      <div
  className={`bg-white shadow-lg rounded-lg p-10 w-full max-w-lg transform transition-all duration-700 ease-out ${
    isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
  }`}
>
  <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-6 transition-all duration-700 ease-in-out  md:space-y-0 md:flex-row md:items-center"
  >
    <div className="flex-grow">
      <label
        htmlFor="longUrl"
        className="block text-lg font-semibold text-gray-700 mb-2"
      >
        Enter your URL:
      </label>
      <input
        type="text"
        id="longUrl"
        placeholder="eg: https://example.com"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        className="w-full px-4 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"

        className={`h-12 md:h-auto mt-3 py-3 px-6 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition flex-shrink-0 `}
      >
       Short URL
      </button>
    </div>
  </form>

  <div
    className={`overflow-hidden transition-all duration-700 ease-in-out ${
      shortUrl ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    {shortUrl && longUrl.length>0 && isShort && (
      <div className="mt-6 p-4 bg-green-100 rounded-md shadow">
        <p className="text-lg text-gray-800">Your Shortened URL:</p>
        <a
          href={fullShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline break-all block"
          
        >
          {fullShortUrl}
        </a>
        <button
          onClick={handleCopy}
          className={`mt-4 w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition  ${isCopied ? 'opacity-70 cursor-wait': 'cursor-pointer'}`}
        >
          {isCopied ? "Copied!" : "Copy URL"}
        </button>
        <button
          onClick={sendUrl}
          className={`mt-4 w-full py-2 bg-green-400  text-white font-semibold rounded-md transition ${isSaved ? 'opacity-70 cursor-wait': ' hover:bg-green-500'}`}
        >
          {isSaved ? "Saved!" : "Save this URL"}
        </button>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Home;
