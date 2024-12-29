import { User } from "../models/user.models.js";
import bcrypt from "bcrypt"; // For password hashing
import { generateToken} from "../auth.js";
async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkUser = await User.findOne({email:email})
    if(checkUser) return res.status(409).json({message: "User already exists",status:false})
   const user = await User.create({ name, email, password: hashedPassword });
    // Generate a JSON Web Token (JWT) for the user
    const token = generateToken(user,'2h')
    res.status(201).json({ message: "User created successfully with token",token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
}
async function handleUserLogIn(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Respond with a success message
      const token = generateToken(user,'4h');
      res.status(200).json({ message: "User logged in successfully with token", token: token });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
}


const handlePasswordChanging = async (req, res) => {
    try {
      const { userEmail, oldPassword, newPassword } = req.body;
  
      // Validate input
      if (!userEmail || !oldPassword || !newPassword) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required" 
        });
      }
  
      // Find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
  
      // Compare old password with stored hash
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Old password is incorrect" 
        });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      await User.updateOne(
        { email: userEmail },
        { $set: { password: hashedPassword } }
      );
  
      res.status(200).json({ 
        success: true, 
        message: "Password changed successfully" 
      });
  
    } catch (err) {
      console.error("Error during password change:", err.message);
  
      res.status(500).json({ 
        success: false, 
        message: "Server error during changing password",
        error: err.message // Added for debugging
      });
    }
  };
  
async function handleAccountDeletion(req, res) {
  try {
    const {email} = req.body;
    if(email){
      const user = await User.findOne({ email: email });
      if(user){

        await User.deleteOne({email:email})
        res.status(200).json({msg:"Account deleted successfully"})
      }
      else{
        res.status(404).json({msg:"User not found"})
      }
    }
    else{
      res.status(400).json({msg:"Email is required"})
    }
  } catch (error) {
    res.status(500).json({msg:"Server error during deletion"})
  }
}

export { handleUserSignUp, handleUserLogIn, handlePasswordChanging,handleAccountDeletion };
