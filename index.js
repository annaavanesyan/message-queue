'use strict';

const Koa = require('koa');
const respond = require('koa-respond');
const bodyParser = require('koa-bodyparser');

const v1Routes = require('./routes/v1');
const config = require('./config');

const app = new Koa();

app.use(respond())
app.use(bodyParser())
app.use(v1Routes.routes());
app.use(v1Routes.allowedMethods());

const port = process.env.PORT || config.get('PORT');
const server = require('http').createServer(app.callback());

server.listen(port, () => {
    console.info(`Server is running on port: ${port}`);
});
