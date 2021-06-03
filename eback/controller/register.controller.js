var authentication = require('./authentication.controller');
var patientModel = require('../model/patient.model');

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
            var result = await patientModel.editPatient(req.body);
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