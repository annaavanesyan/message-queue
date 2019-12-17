'use strict';

const Router = require('koa-router');

const messagesRoute = require('./messages');
const messageSubscribersRoute = require('./messageSubscribers');

const router = new Router({ prefix: '/v1' });

router.use(messageSubscribersRoute.routes());
router.use(messagesRoute.routes());

router.get('/ping', ctx => ctx.ok('pong'));

module.exports = router;
