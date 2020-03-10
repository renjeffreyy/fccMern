//referencing mongoose
const mongoose = require('mongoose');

//defining the schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps:true,
});


//exporting a model
const User = mongoose.model('User',userSchema);

module.exports = User;