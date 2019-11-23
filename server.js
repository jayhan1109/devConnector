import express from "express";
import {connectDB} from './config/db';

const app = express();

// Connect Database
connectDB();

app.get('/',(req,res)=>{
    res.send('Server start!');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is on PORT ${PORT}`));
