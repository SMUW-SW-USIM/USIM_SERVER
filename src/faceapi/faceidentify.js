'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase + '/identify';

// Face [POST] identify
const faceIdentify = () => {

    const options = {
        uri: uriBase,
        body: '{"personGroupId": "daeunshim", "faceIds": ["f17947e0-b7a0-4351-85ed-d23beb27ee14"]}',
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
        let jsonResponse = JSON.parse(body);
        console.log("personId"+ jsonResponse[0].candidates[0].personId);
    });
}

faceIdentify();

module.exports = faceIdentify



