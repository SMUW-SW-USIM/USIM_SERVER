'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase + '/identify';

// Face [POST] identify
const faceIdentify = async (faceId) => {

    const options = {
        uri: uriBase,
        body: '{"personGroupId": "daeunshim", "faceIds": ["' + faceId + '"]}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post (options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        let jsonResponse = JSON.parse(body);
        console.log("personId: "+ jsonResponse[0].candidates[0].personId);
        return jsonResponse[0].candidates[0].personId;
    });
}

// console.log(faceIdentify("448dc7e9-052a-409a-a085-69600d0c06ed"));

module.exports = faceIdentify



