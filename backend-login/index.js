import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import User from './model/model.js';
import dotenv from 'dotenv';
dotenv.config();


const App = express();
App.use(express.json())

App.use(cors())
App.use(cors({
  origin: 'https://login-lake-five.vercel.app', // your frontend URL
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

const PORT = process.env.PORT;
// MongoDB is Connected Here
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to database");
    App.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING IN PORT ${PORT}`)
})
  })
  .catch((error) => {
    console.error("Connection Failed:", error);

  });
// GET METHOD IS USED HERE
App.get('/api/user', async (req,res)=>{
    try{
      const users = await User.find();
      res.json(users);
    }catch(error){
      res.status(500).json({ message: error.message });
    }
});


// POST METHOD IS USED HERE
App.post('/api/register', async(req,res)=>{
  let {username , password} =req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  username = username.toLowerCase();
        try{
          const existingUser = await User.findOne({username});
          if(existingUser){
            return res.status(400).json({ message: "Username already exists" });
  }
        const userDetail = await User.create(req.body);
        return res.status(201).json({ message: "Account created successfully", user: userDetail });
    }catch(error){
          if (error.code === 11000) {
          return res.status(400).json({ message: "Username already exists" });
        }
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})



