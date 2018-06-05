//Author: Tommy Suen U77227951
//CS591 Assignment 3
//Professor Donham

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Mongoose Schema
const Schema = mongoose.Schema;
const wordSchema = new Schema({
    word: String,
    length: Number
});

const words = mongoose.model('word', wordSchema);

//No input, then get everything in the database
router.get('', (req, res) =>{
    words.find(function(err, result){
        res.json(result)
    });
});

//Finds ID, if cannot find, then add the word and length into the DB and then
//return the json formatted word and length
router.get('/:id', function(req, res){
    words.find({word:req.params.id}, function(err, wording){
        //Cannot Find the Word in DB
        if(wording == ''){
            let newWord = new words({
                word:req.params.id,
                length:req.params.id.length
            });
            //Add the word
            newWord.save();
            //Return the JSON data
            res.json({
                'String': req.params.id,
                'Length': req.params.id.length
            })
        }
        //If it is in the Database, just return it
        else {
            res.json(wording);
        }
    })
});

//Post Request that returns the String and length of an Input
//http://localhost:3000/hw1/input
router.post('', function(req, res){
    //If user did not enter a value
    if(req.body.word == ''){
        res.json("Please Enter a String")
    }
    else {
        words.find({word: req.body.word}, function (err, result) {
            //If the user entered a word and there is data, then return it
            if (result != '') {
                res.json(result)
            }
            //If there is no data, add in the data
            else {
                let newWord = new words({
                    word: req.body.word,
                    length: req.body.word.length
                });

                newWord.save();
                res.json(newWord);
            }
        });
    }
});

router.delete('', function(req, res){
    words.find({word:req.body.word}, function(err, result){
        //If there is data of the user's word, then remove it
       if(result != ''){
           words.remove({word:req.body.word}, function(err, result){
               if(err){
                   res.send(err);
               }
               else{
                   res.json("Successfully Deleted")
               }
           });
       }
       else{
           res.json("No such string exists");
       }
    });
})

module.exports = router;