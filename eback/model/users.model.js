var mysql = require('mysql');

const mysqlConnetionParams = {
    host: 'localhost',
    user: 'david',
    password: 'mysql123',
    database: 'ECovid'
}

try {
    var mysqlConnection = mysql.createConnection( mysqlConnetionParams );
} catch (error) {
    throw error;
};

function checkUser( user, password, role) {

    return new Promise(async function(resolve, reject) {

        try {
            
            await mysqlConnection.query("SELECT USER,PASSWORD,ROLE FROM USERS WHERE USER = '" + user + "' and ROLE = '" + role + "' and PASSWORD = '" + password + "';", 
            function(err,result) {
                result = JSON.parse(JSON.stringify(result));
                return err ? reject(err) : resolve(result);
            });

        } catch(error) {
            reject(error);
        }

    });

};

function getUsers() {
    
    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("SELECT NAME,LASTNAME,USER,ROLE FROM USERS WHERE ROLE != 'admin';",
            function(err,result) {
                result = JSON.parse(JSON.stringify(result));
                return err ? reject(err) : resolve(result);
            });
        } catch(error) {
            reject(error);
        }
    });
    
};

module.exports = {checkUser, getUsers};