var mysql = require('mysql');

const mysqlConnectionParams = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'covid_db'

}

try{
    var mysqlConnection = mysql.createConnection(mysqlConnectionParams);
} catch (error) {
    throw error;
};

function checkUser( user, password, role ){

    return new Promise(async function (resolve, reject){
        try {
            await mysqlConnection.query("SELECT USER, PASSWORD, ROLE FROM USERS WHERE USER = '" + user + "' and ROLE = '" + role + "' and PASSWORD = '" + password + "';",
            function(err,result){

                if (!err){
                    result = JSON.parse(JSON.stringify(result));
                }
                return err ? reject(err.code) : resolve(result);
            
            });
        } catch(error){
            reject(error);
        }

    });
};

function showCase (caseInfo) {
    return new Promise(async function(resolve, reject){

        try {
            await mysqlConnection.query("SELEC PATIENTID, STATUS, LASTUPDATE FROM CASES WHERE PATIENTID = " + caseInfo.PATIENTID + ";",
            function(err, result){

                if(!err) {
                    result = JSON.parse(JSON.stringify(result));
                }

                return err ? reject(err.code) : resolve(result);
            
            });
        } catch(error) {
            reject(error);
        }
    });
}

function addStatus(caseInfo){
    return new Promise(async function(resolve,reject){

        try {
            await mysqlConnection.query("INSERT INTO CASES (STATUS, LASTUPDATE, PATIENTID) VALUES"+ "('" + caseInfo.STATUS + "' , " + caseInfo.LASTUPDATE+ " ," + caseInfo.PATIENTID+ ")",
            function(err) {
                return err ? reject(err.code) : resolve(true);
            });
        } catch (error){
            reject(error);
        }
    });
}

module.exports = {checkUser, showCase, addStatus};