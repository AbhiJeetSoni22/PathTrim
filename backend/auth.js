import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const secret = process.env.SECRET_KEY

const generateToken = (user,expIn)=>{
    const payload = {
        email: user.email,
        name: user.name
    }
    const options = { expiresIn: expIn }; // Token expiration time (1 hour)

 return jwt.sign(payload,secret,options)
}

const verifyToken = (token) => {
    try {
      return jwt.verify(token, secret); // Verifies the token with the secret key
    } catch (error) {
      return null; // Invalid token
    }
  };

export { generateToken, verifyToken }