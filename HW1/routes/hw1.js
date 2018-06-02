//Author: Tommy Suen U77227951
//CS591 Assignment 1
//Professor Donham

const express = require('express');
const router = express.Router();

//Get Request that returns the String and Length of a given ID
//http://localhost:3000/hw1/:id
router.get('/:id', function(req, res){
    res.send({
        "string": req.params.id,
        "length": req.params.id.length
    })
});

//Post Request that returns the String and length of an Input
//http://localhost:3000/hw1/input
router.post('/input', function(req, res){
    res.json({
        "string": req.body.id,
        "length": req.body.id.length
    })
});

module.exports = router;