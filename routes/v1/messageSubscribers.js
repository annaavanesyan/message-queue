'use strict';

const Router = require('koa-router');

const MessageSubscriberController = require('../../controllers/MessageSubscriber');

const router = new Router({
    prefix: '/messages/subscribers'
});

router.post('/', MessageSubscriberController.create);

module.exports = router;
