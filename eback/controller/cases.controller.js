var authentication = require('./authentication.controller')
var casesModel = require('../model/cases.model');

async function showCase(req, res, next){

    try{

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated){
            var result = await casesModel.showCase(req.body);
            res.json(result);
        } else {
            res.json(false);
        }
    } catch(error){
        console.error(error);
        res.status(500).send({"err" : "Internal error on show case"});
    }
};

async function addStatus(req, res, next){

    try{

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated){
            var result = await casesModel.addStatus(req.body);
            res.json(result);
        } else{
            res.json(false);
        } 

    } catch (error){
        console.error(error);
        res.status(500).send({"err" : "Internal error on add status"});
    }

    
};

module.exports = {showCase, addStatus};
