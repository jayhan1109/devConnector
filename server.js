import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send('Server start!');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is on PORT ${PORT}`));
