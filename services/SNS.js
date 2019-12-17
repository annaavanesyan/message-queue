'use strict';

const _ = require('lodash');
const AWS = require('aws-sdk');

const config = require('../config');

AWS.config.update({ region: config.get('AWS_REGION') });
const ses = new AWS.SES();

class SNS {
    static async send(message, receivers = []) {
        const params = {
            Destination: {
                ToAddresses: receivers
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: message
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'New Message!'
                }
            },
            Source: 'No-Reply Miban'
        };
        
        if (!_.isEmpty(receivers)) {
            await ses.sendEmail(params).promise();
        }
    }
}

module.exports = SNS;
