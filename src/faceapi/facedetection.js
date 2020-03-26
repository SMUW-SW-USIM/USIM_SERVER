'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase +'/detect';
let jsonResponse;

// Face [POST] detect
const faceDetect = async (imageUrl) => {
    const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'age,gender'
    };

    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
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
        jsonResponse = JSON.parse(body);
        console.log('faceID: '+ jsonResponse[0].faceId);
        console.log('gender: '+ jsonResponse[0].faceAttributes.gender);
        console.log('age: '+ jsonResponse[0].faceAttributes.age);

    });
}


module.exports = faceDetect