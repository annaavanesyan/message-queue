'use strict';

const _ = require('lodash');

const AMQP = require('../services/AMQP');

class MessageController {
    static async create(ctx) {
        const { name, message } = ctx.request.body;

        if (_.isEmpty(name)) {
            return ctx.badRequest('Event Name Required.');
        }

        const result = await AMQP.sendMessage(name, message);

        return result ? ctx.created() : ctx.internalServerError();
    }
}

module.exports = MessageController;
