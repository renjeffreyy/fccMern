//these are kind of like imports requiring express router and exercise models we made

const router = require('express').Router();
let Exercise = require('../models/exercise.models');

//get response we are going to run
router.route('/').get((req,res)=> {
    //we are going to find the exercises
    Exercise.find()
    //then when we find the exercises we return a json response with 
    //all the exercises
        .then(exercises => res.json(exercises))
    //if there is an error we catch it and return this resposne
        .catch(err => res.status(400).json('Error: ' + err));
})

//if we have /exercises/add then it is a pose request
router.route('/add').post((req,res) =>{
//in the body of the post request we are going to have the below variables
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
//we create a new instance of the exercise
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    })

    //we save the exercises and then execute the promise
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;