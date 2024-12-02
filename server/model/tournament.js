//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let tournamentModel = mongoose.Schema({
    TeamNames: String,
    Date: String,
    Location: String,
    Description: String,
    Winner: String
},
{
    collection:"Bio_tournaments"
});
module.exports =mongoose.model('Tournament',tournamentModel);
