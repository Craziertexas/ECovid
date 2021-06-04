var authentication = require('./authentication.controller')
var casesmodel = require('../model/cases.model');

async function showCase(req, res, next){

    try{

        var authenticated = await authentication.getAuthentiction(req.body.user,req.body.password,'assistant');

        if (authenticated){
            var result = await casesmodel.showCase();
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
            var result = await casesmodel.addStatus(req.body);
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
