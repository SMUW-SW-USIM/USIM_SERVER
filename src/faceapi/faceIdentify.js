'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase + '/identify';

// Face [POST] identify
const faceIdentify = async (faceId) => {
    let result ={}
    const options = {
        uri: uriBase,
        body: '{"personGroupId": "daeunshim", "faceIds": ["' + faceId +'"]}',
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
            console.log("personId"+ jsonResponse[0].candidates[0].personId);
            // let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
            // console.log('JSON Response\n');
            // console.log(jsonResponse);
            result = {
                personId : jsonResponse[0].candidates[0].personId
            }
            if(error) {
                reject(error)
            }
            resolve(result);
        });
    });
    console.log("finally return : " + result.personId)
    return result.personId;
}

// faceIdentify("6016728d-3fb4-4285-a81b-a3e5265bacbf");

module.exports = faceIdentify



