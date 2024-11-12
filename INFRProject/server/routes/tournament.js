var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Tournament = require('../model/tournament.js');
//const tournament = require('../model/tournament.js');
//let tournamentController = require('../Controllers/tournament.js')
/* Get route for the tournament list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the tournaments list */
router.get('/',async(req,res,next)=>{
try{
    const TournamentList = await Tournament.find();
    res.render('Tournament/list',{
        title:'Tournaments',
        TournamentList:TournamentList
    })}
    catch(err){
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Tournament/add',{
            title: 'Add Tournament'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newTournament = Tournament({
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        Tournament.create(newTournament).then(()=>{
            res.redirect('/tournamentslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const tournamentToEdit= await Tournament.findById(id);
        res.render('Tournament/edit',
            {
                title:'Edit Tournament',
                Tournament:tournamentToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedTournament = Tournament({
            "_id":id,
            "Name":req.body.Name,
            "Author":req.body.Author,
            "Published":req.body.Published,
            "Description":req.body.Description,
            "Price":req.body.Price
        });
        Tournament.findByIdAndUpdate(id,updatedTournament).then(()=>{
            res.redirect('/tournamentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Tournament.deleteOne({_id:id}).then(()=>{
            res.redirect('/tournamentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;