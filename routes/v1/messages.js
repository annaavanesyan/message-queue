'use strict';

const Router = require('koa-router');

const MessagesController = require('../../controllers/Message');

const router = new Router({
    prefix: '/messages'
});

router.post('/', MessagesController.create);

module.exports = router;
