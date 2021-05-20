var crypto = require('crypto-js');

function decrypt(data) {
    return new Promise(function(resolve, reject) {

        try {
            data = crypto.AES.decrypt(data, 'secret');
            data = data.toString(crypto.enc.Utf8);
            resolve(data);
        } catch (error) {
            reject(error);
        }

    });
};

function encrypt(data) {
    return new Promise(function(resolve, reject) {

        try {
            data = crypto.AES.encrypt(data, 'secret').toString();
            resolve(data);
        }catch (error) {
            reject(error);
        }

    });
};

module.exports = {encrypt, decrypt};