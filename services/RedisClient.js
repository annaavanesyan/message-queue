const Redis = require('redis');

const config = require('../config');

class RedisClient {
    static getDriver() {
        if (!this.driver) {
            this.driver = Redis.createClient(config.get('REDIS_URL'));

            this.driver.on('ready', () => {
                console.info('Redis:ready');
            });

            this.driver.on('connected', () => {
                console.info('Redis:connected');
            });

            this.driver.on('disconnected', () => {
                console.warn('Redis:disconnected');
            });

            this.driver.on('error', err => {
                console.error(err);
            });
        }

        return this.driver;
    }

    static set(key, value) {
        try {
            RedisClient.getDriver().rpush(key, value);

            return true;
        } catch (err) {
            console.error(err);

            return false;
        }
    }

    static get(key) {
        return new Promise(resolve => {
            RedisClient.getDriver().lrange(key, 0, -1, (err, result) => {
                if (err) {
                    console.error(err);

                    resolve([]);
                }

                resolve(result || []);
            });
        });
    }
}


module.exports = RedisClient;