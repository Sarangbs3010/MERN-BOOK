import express from 'express';
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Welcome to Book Strore');
})

app.use('/books',booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('Connected to Database');
    app.listen(PORT, ()=>{
        console.log(`Connected to port : ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
})