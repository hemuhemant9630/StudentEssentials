import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//config env
dotenv.config();

const app = express()

app.get('/', (req,res) => {
    res.send("<h1>welcome to mern project by HRH</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});