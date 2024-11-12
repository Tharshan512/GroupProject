//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let tournamentModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: Number
},
{
    collection:"Bio_tournaments"
});
module.exports =mongoose.model('Tournament',tournamentModel);
