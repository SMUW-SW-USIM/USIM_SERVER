'use strict';
const request = require('request');
const faceConfig = require('../../config/faceapi_config')
const subscriptionKey = faceConfig.subscriptionKey;
const uriBase = faceConfig.uriBase +'/persongroups/daeunshim/persons/';

//  [POST] person add face
const personAddFace = (personId, url) => {

    const options = {
        uri: uriBase + personId + "/persistedFaces",
        body: '{"url": ' + '"' + url + '"}',
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
        console.log('persistedFaceId: '+ jsonResponse.persistedFaceId);
    });
}

// personAddFace("de8757b6-6676-4bca-b8ac-dbde1c838ccb",
//     "");

module.exports = personAddFace