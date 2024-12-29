
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth";
import Home from "./component/home"; // Assuming you have a Home component
import UserUrls from "./component/userUrls";
import ChangePassword from "./component/ChangePassword";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<UserUrls />} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;