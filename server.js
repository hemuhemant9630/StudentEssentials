import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';


//config env
dotenv.config();

//database config
connectDB();

const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.send("<h1>welcome to mern project by HRH</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});