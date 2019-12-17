'use strict';

const _ = require('lodash');
var amqp = require('amqplib');

const RedisClient = require('./RedisClient');
const config = require('../config');
const SNS = require('./SNS');

class AMQP {
    static async getConnection() {
        if (!this.connection) {
            this.connection = await amqp.connect(config.get('RABBITMQ_URL'));

            this.connection.on('error', function(err) {
                console.error('[AMQP]:connection:error', err.message);
            });

            this.connection.on('close', function() {
                console.log('[AMQP]:connection:closed');
            });
        }

        return this.connection;
    }

    static async getChannel() {
        if (!this.channel) {
            const connection = await AMQP.getConnection();
            this.channel = await connection.createConfirmChannel();

            this.channel.on('error', function(err) {
                console.error('[AMQP]:channel:error', err.message);
            });

            this.channel.on('close', function() {
                console.log('[AMQP]:channel:closed');
            });
        }

        return this.channel;
    }

    static async sendMessage(queueName, message) {
        const channel = await AMQP.getChannel();

        channel.assertQueue(queueName, { durable: false });
        AMQP.consumeMessage(queueName);

        return channel.sendToQueue(
            queueName,
            !_.isBuffer(message) ? Buffer.from(message) : message
        );
    }

    static async consumeMessage(queueName) {
        const channel = await AMQP.getChannel();
        await channel.assertQueue(queueName, { durable: false });

        const receivers = await RedisClient.get(queueName);

        channel.consume(
            queueName,
            message => SNS.send(message.content.toString(), receivers),
            { noAck: true }
        );
    }
}

module.exports = AMQP;
