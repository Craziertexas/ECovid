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

                if (!err) {
                    result = JSON.parse(JSON.stringify(result));
                }

                return err ? reject(err.code) : resolve(result);
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

                if (!err) {
                    result = JSON.parse(JSON.stringify(result));
                };

                return err ? reject(err.code) : resolve(result);
            });
        } catch(error) {
            reject(error);
        }
    });
    
};

function addUser(userInfo) {

    return new Promise(async function(resolve, reject) {
        
        try{
            await mysqlConnection.query("INSERT INTO USERS (NAME, LASTNAME, ID, USER, PASSWORD, ROLE) VALUES" + "('" + userInfo.NAME + "','" + userInfo.LASTNAME + "'," + userInfo.ID + ",'" + userInfo.NEWUSER + "','" + userInfo.NEWPASSWORD + "','" + userInfo.ROLE + "')",
            function(err) {
                return err ? reject(err.code) : resolve(true);
            });
        } catch(error) {
            reject(error);
        }
    });
}

function removeUser(userInfo) {

    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("DELETE FROM USERS WHERE USER = '" + userInfo + "';",
            function(err) {
                return err ? reject(err.code) : resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function editUser(userInfo) {

    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("UPDATE USERS SET NAME = '" + userInfo.NAME + "', LASTNAME = '" + userInfo.LASTNAME + "', ID = " + userInfo.ID + ", USER = '" + userInfo.NEWUSER + "', PASSWORD = '" + userInfo.NEWPASSWORD + "', ROLE = '" + userInfo.ROLE + "' WHERE USER = '" + userInfo.OLDUSER +"';",
            function(err) {
                return err ? reject(err) : resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {checkUser, getUsers, addUser, removeUser, editUser};