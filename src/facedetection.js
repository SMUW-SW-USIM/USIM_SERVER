'use strict';
const request = require('request');
const faceConfig = require('../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase;

// [POST] detect
const faceDetect = (imageUrl) => {
    const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
            'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
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
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
    });
}

faceDetect('https://usimbucket.s3.ap-northeast-2.amazonaws.com/visitors/ak9mpP-m1.1583904587143.jpg')

module.exports = faceDetect