//need express router because this is a route that we are creating
const router = require('express').Router();
// the mongoose user model that we created.
let User = require('../models/user.model');

//end point that handles http get requests ont he /user path
router.route('/').get((req,res) =>{
    //mongoose method that gets all the users fromt he mongodb atlas db
    //the find method returns a promise
    User.find()
    //after we find all the users return a response with all the users
    //in json format
        .then(users => res.json(users))
    //if there is an error return a response status 400 with error message
        .catch(err => res.status(400).json('Error: ' + err));
});


//handles incoming http podt requests
router.route('/add').post((req,res) => {
    //creates username variable user name is part of the request body
    const username = req.body.username;
    // creates a new instance of the user with username
    const newUser = new User({username});
    //after it saves the user it will return a json response user added
    newUser.save()
        .then(()=> res.json('user added!'))
        // if there is an error return the error message
        .catch(err => res.status(400).json('Error: ' + err));
});

//export the router
module.exports = router;