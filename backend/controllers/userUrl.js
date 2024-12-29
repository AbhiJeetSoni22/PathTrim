import { UserUrl } from "../models/userUrl.models.js";
import { verifyToken } from "../auth.js";
async function handleSendUrls(req,res){
    try {
        const {email,shortUrl,longUrl} = req.body;
        const checkUrl = await UserUrl.findOne({email,longUrl});
    
    if(checkUrl) {
        return res.status(400).json({ message: "Url already exists" });
      }
        await UserUrl.create({
            email,
            shortUrl,
            longUrl, 
        })
        res.status(201).json({ message: "Url stored successfully" })
    } catch (error) {
        console.log("Url not stored "+error)
    }
}
async function handleGetUrls(req,res){
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userData = verifyToken(token,process.env.SECRET_KEY);
        const {email} = req.body;
        if (!userData) {
          return res.status(401).json({ message: 'Invalid or expired token' });
        }
        const urls = await UserUrl.find({email})
        res.status(200).json({urls})
    } catch (error) {
        console.log("Url not stored "+error)
    }
}

async function handleDeleteUrls(req,res){
    try {
        const {email} = req.body;
        await UserUrl.deleteMany({email})
        res.status(200).json({ message: "Url deleted successfully" })
    } catch (error) {
        console.log("Url not deleted "+error)
    }
}
export { handleSendUrls,handleGetUrls,handleDeleteUrls}