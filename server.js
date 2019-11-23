import express from "express";
import {connectDB} from './config/db';
import { router as authRouter } from "./routes/api/auth";
import { router as postsRouter } from "./routes/api/posts";
import { router as profileRouter } from "./routes/api/profile";
import { router as usersRouter } from "./routes/api/users";


const app = express();

// Connect Database
connectDB();

app.get('/',(req,res)=>{
    res.send('Server start!');
})

// Define Routes
app.use('/api/users',usersRouter);
app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);
app.use('/api/posts',postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is on PORT ${PORT}`));
