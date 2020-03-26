'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase + '/identify';

// Face [POST] identify
const faceIdentify = async (faceId) => {

    const options = {
        uri: uriBase,
        body: '{"personGroupId": "daeunshim", "faceIds": ["' + faceId +'"]}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        // let jsonResponse = JSON.parse(body);
        // console.log("personId"+ jsonResponse[0].candidates[0].personId);
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
    });
}

// faceIdentify("7096cb20-3f1b-436d-90e2-a16ffce07904");

module.exports = faceIdentify



