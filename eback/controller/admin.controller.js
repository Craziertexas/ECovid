var authentication = require('./authentication.controller');
var userModel = require('../model/users.model');;

async function getUsers(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');

        if (authenticated) {
            var users = await userModel.getUsers();
            res.json(users);
        } else {
            res.status(501).send({"err" : "Invalid username or password"});
        }

    } catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on get users!"});
    }

};

async function addUser(req, res, next) {

    try {

        var authenticated = await authentication.getAuthentication(req.body.user,req.body.password,'admin');
        
        if (authenticated) {
            res.json('addUser');
        } else {
            res.status(501).send({"err" : "Invalid username or password"})
        }

    }catch(error) {
        console.error(error);
        res.status(500).send({"err" : "Internal error on add user!"});
    }

};

module.exports = {getUsers, addUser};