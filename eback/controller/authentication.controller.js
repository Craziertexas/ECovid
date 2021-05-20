var usersModel = require('../model/users.model');
var crypter = require('../utils/encryption');

function getAuthentication (user, password, role) {

    return new Promise(async function (resolve, reject) {

        try{

            user = await crypter.decrypt(user);
            password = await crypter.decrypt(password);

            var UserInfo = await usersModel.checkUser(user, password, role);
            
            if (UserInfo.length > 0) {

                if (user == UserInfo[0].USER && password == UserInfo[0].PASSWORD && role == UserInfo[0].ROLE) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                
            } else {
                resolve(false);
            }

        } catch(error) {
            reject(error);
        }

    });
    
};

module.exports = {getAuthentication};