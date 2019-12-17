'use strict';

const _ = require('lodash');
const validator = require('validator');

const RedisClient  = require('../services/RedisClient');

class MessageSubscriberController {
    static async create(ctx) {
        const { name, email } = ctx.request.body;

        if (_.isEmpty(name)) {
            return ctx.badRequest('Event Name Required.')
        }
        
        if (!validator.isEmail(email)) {
            return ctx.badRequest('Email Invalid')
        } else if (_.isEmpty(email)) {
            return ctx.badRequest('Email Required')
        }

        const result = RedisClient.set(name, email);

        return result ? ctx.created() : ctx.internalServerError();
    }
}

module.exports = MessageSubscriberController;
