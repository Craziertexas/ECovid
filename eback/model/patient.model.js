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

function getPatients() {
    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("SELECT NAME, LASTNAME, ID, SEX, BIRTHDAY, EXAM, EXAMDATE, PATIENTID FROM PATIENT", 
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

function addPatient(userInfo) {
    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("INSERT INTO PATIENT (NAME, LASTNAME, ID, SEX, BIRTHDAY, HOMELOCLAT, HOMELOCLONG, WORKLOCLAT, WORKLOCLONG, EXAM, EXAMDATE, PATIENTID) VALUES"+ "('" + userInfo.NAME + "','" + userInfo.LASTNAME + "'," + userInfo.ID + ",'" + userInfo.SEX + "','" + userInfo.BIRTHDAY + "','" + userInfo.HOMELOCLAT + "', '" + userInfo.HOMELOCLONG+"', '" + userInfo.WORKLOCLAT +"', '" + userInfo.WORKLOCLONG + "', '" + userInfo.EXAM + "', '" + userInfo.EXAMDATE + "', '" + userInfo.PATIENTID + "')",
            function(err,result){
                return err ? reject(err.code) : resolve(true);
            });
        } catch (error) {
            reject(error);
        }

    });
}

function editPatient(userInfo) {
    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("UPDATE PATIENT SET NAME = '" + userInfo.NAME + "', LASTNAME = '" + userInfo.LASTNAME + "', ID = " + userInfo.ID + ", SEX = '" + userInfo.SEX + "', BIRTHDAY = " + userInfo.BIRTHDAY + ", HOMELOCLAT = " + userInfo.HOMELOCLAT + ", HOMELOCLONG= " + userInfo.HOMELOCLONG + ", WORKLOCLAT = " + userInfo.WORKLOCLAT + ", WORKLOCLONG = " + userInfo.WORKLOCLONG + ", EXAM = '" + userInfo.EXAM + "', EXAMDATE = " + userInfo.EXAMDATE + ", PATIENTID = " + userInfo.PATIENTID + " WHERE PATIENTID = " + userInfo.OLDPATIENTID +";",
            function(err, result){
                return err ? reject(err.code) : resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function deletePatient(userInfo) {
    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("DELETE FROM PATIENT WHERE PATIENTID = " + userInfo + ";",
            function(err, result){
                return err ? reject(err.code) : resolve(true);
            })
        } catch (error) {
            reject(error);
        }
    })
}

function getPatient(userInfo) {
    return new Promise(async function(resolve, reject) {

        try {
            await mysqlConnection.query("SELECT NAME, LASTNAME, ID, SEX, BIRTHDAY, HOMELOCLAT, HOMELOCLONG, WORKLOCLAT, WORKLOCLONG, EXAM, EXAMDATE, PATIENTID FROM PATIENT WHERE PATIENTID = " + userInfo + "; ",
            function(err, result){

                if(!err) {
                    result = JSON.parse(JSON.stringify(result));
                }

                return err ? reject(err.code) : resolve(result);
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {getPatients,addPatient,editPatient, deletePatient, getPatient};