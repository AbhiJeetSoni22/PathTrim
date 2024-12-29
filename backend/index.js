import express from 'express';
import  urlRouter  from './router/url.js'
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000
import userRouter from './router/user.js'
import userUrlRouter from './router/userUrl.js'
import { connectDB } from './connection.js'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

app.use(cors());
app.use(express.json());
// getting url from .env file and passing it for established connections
const dbURL = process.env.MONGODB_URL
connectDB(dbURL);

app.use(express.json())
app.use('/url',urlRouter)
app.use('/user',userRouter)
app.use('/userUrl',userUrlRouter)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})