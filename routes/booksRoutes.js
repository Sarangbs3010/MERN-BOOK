import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

router.post('/',async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            console.log(req.body.title);
            console.log(req.body.author);
            console.log(req.body.publishYear);
            return res.status(400).send({
                message: 'Send all required fields: title,author,publishYear',
            })
        }
        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message : err.message});
    }
});

//Get All Books

router.get('/',async(req,res)=>{
    try{
        const books = await Book.find({});
        if(books.length == 0){
            res.status(404).json({message:'No Books Found'});
        }
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//Get one book

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            res.status(404).json({message:'Book Not Found'});
        }
        return res.status(200).json(book);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

//Update book

router.put('/:id',async(req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            console.log(req.body.title);
            console.log(req.body.author);
            console.log(req.body.publishYear);
            return res.status(400).send({
                message: 'Send all required fields: title,author,publishYear',
            })
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({message:'Book Not Found'});
        }
        return res.status(200).send({message:'Book Updated Successfully'});
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

//Delete book

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            res.status(404).json({message:'Book Not Found'});
        }

        return res.status(200).send({message:'Book is deleted successfully'});
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

export default router;