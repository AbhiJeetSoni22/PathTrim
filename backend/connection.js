import mongoose from 'mongoose';

// connect to the mongodb
async function connectDB(url){
    return mongoose.connect(url).then(()=>{
        console.log('MongoDB Connected...');
    }).catch((err)=>{
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    })
}

export { connectDB }