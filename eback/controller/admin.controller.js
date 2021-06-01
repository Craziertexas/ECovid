var authentication = require('./authentication.controller');
var userModel = require('../model/users.model');
var crypter = require('../utils/encryption'); 

async function getUsers(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');

        if (authenticated) {
            var users = await userModel.getUsers();
            res.json(users);
        } else {
            res.json(false);
        }

    } catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on get users!"});
    }

};

async function getDetailUser(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');

        if (authenticated) {
            var user = await userModel.getDetailUser(req.body.checkUser);
            user[0]['USER'] = await crypter.encrypt(user[0]['USER']);
            user[0]['PASSWORD'] = await crypter.encrypt(user[0]['PASSWORD']);
            res.json(user);
        } else {
            res.json(false);
        }

    } catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on get Detailed User"});
    }
}

async function addUser(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');
        
        if (authenticated) {
            req.body['NEWUSER'] = await crypter.decrypt(req.body['NEWUSER']);
            req.body['NEWPASSWORD'] = await crypter.decrypt(req.body['NEWPASSWORD']);
            req.body['ID'] = await crypter.decrypt(req.body['ID']);
            var result = await userModel.addUser(req.body);
            res.json(result);
        } else {
            res.json(false);
        }

    }catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on add user!"});
    }

};

async function removeUser(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');

        if (authenticated) {
            var result = await userModel.removeUser(req.body.deleteUser);
            res.json(result);
        } else {
            res.json(false);
        }
    }catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on remove User!"});
    }
}

async function editUser(req, res, next) {

    try {
        
        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');
        req.body['NEWUSER'] = await crypter.decrypt(req.body['NEWUSER']);
        req.body['NEWPASSWORD'] = await crypter.decrypt(req.body['NEWPASSWORD']);
        req.body['ID'] = await crypter.decrypt(req.body['ID']);
        req.body['OLDUSER'] = await crypter.decrypt(req.body['OLDUSER']);
        if (authenticated) {
            console.log(req.body);
            var result = await userModel.editUser(req.body);
            res.json(result);
        } else {
            res.json(false);
        }
    }catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on edit User!"});
    }
}

module.exports = {getUsers, getDetailUser,addUser, removeUser, editUser};