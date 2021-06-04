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

        if (authentitaced){
            console.log(req.body);
            req.body['STATUS'] = await CryptoKeyPair.decrypt(req.body['STATUS']);
            req.body['LASTUPDATE'] = await CryptoKeyPair.decrypt(req.dody['LASTUPDATE']);
            console.log(req.body);
            var result = await casesmodel.addStatus(req.body.STATUS);
            res.json(result);

        } else{
            res.json(false);
        }  

        if (result=='D'){
            res.json(false);
        }
                

    } catch (error){
        console.error(error);
        res.status(500).send({"err" : "Internal error on add status"});
    }

    
};

module.exports = {showCase, addStatus};
