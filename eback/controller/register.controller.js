var authentication = require('./authentication.controller');
var patientModel = require('../model/patient.model');
var crypter = require('../utils/encryption'); 

async function getPatients(req, res, next) {

    try {
      
        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated) {
            var result = await patientModel.getPatients();
            res.json(result);
        } else {
            res.json(false);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on get Patient"});
    }

};

async function addPatient(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated) {
            req.body['ID'] = await crypter.decrypt(req.body['ID']);
            req.body['PATIENTID'] = await crypter.decrypt(req.body['PATIENTID']);
            console.log(req.body);  
            var result = await patientModel.addPatient(req.body);
            res.json(result);
        } else {
            res.json(false);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on add patient"});
    }

};

async function editPatient(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated) {
            req.body['ID'] = await crypter.decrypt(req.body['ID']);
            req.body['PATIENTID'] = await crypter.decrypt(req.body['PATIENTID']);
            req.body['OLDPATIENTID'] = await crypter.decrypt(req.body['OLDPATIENTID']);
            console.log(req.body);
            var result = await patientModel.editPatient(req.body);
            console.log(result);
            res.json(result);
        } else {
            res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on edit patient"});
    }
};

async function deletePatient(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated) {
            var result = await patientModel.deletePatient(req.body.PATIENTID);
            res.json(result);
        } else {
            res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on delete patient"});
    }
};

async function getPatient(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'assistant');

        if (authenticated) {
            var result = await patientModel.getPatient(req.body.PATIENTID);
            res.json(result);
        } else {
            res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on get patient"});
    }
}

module.exports = {getPatients, addPatient, editPatient, deletePatient, getPatient};