'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase +'/detect';

// Face [POST] detect
const faceDetect = async (imageUrl) => {
    const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'age,gender'
    };

    let result = {}
    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
    await new Promise(async (resolve, reject) => {
        request.post(options, async (error, response, body) => {
            if (error) {
                console.log('Error: ', error);
                return;
            }
            let jsonResponse = await JSON.parse(body);
            result = {
                faceId : jsonResponse[0].faceId
            }
            if(error) {
                reject(error)
            }
            resolve(result);
        });
    });
    console.log("finally return : " + result.faceId)
    return result.faceId;
}

// faceDetect('url')

module.exports = faceDetect