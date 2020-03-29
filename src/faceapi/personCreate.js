'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase +'/persongroups/daeunshim/persons';

//  [POST] person create
const personCreate = async (personname) => {
    let result = {}
    const options = {
        uri: uriBase,
        body: '{"name": ' + '"' + personname + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
    await new Promise(async (resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (error) {
                console.log('Error: ', error);
                return;
            }
            let jsonResponse = JSON.parse(body);
            // console.log('personId: '+ jsonResponse.personId); //personId 반환해야됨 -> db 저장과 personCreate의 파라미터
            result = {
                personId: jsonResponse.personId
            }
            if (error) {
                reject(error)
            }
            resolve(result);
        });
    });
console.log("finally return : " + result.personId)
return result.personId;
}

// personCreate("지창욱")


module.exports = personCreate