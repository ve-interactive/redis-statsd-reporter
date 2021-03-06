'use strict';

let should = require('should');
let expectedKeyCount = 2;

describe('redis-key-counter', () => {
    let keyCounter = require('../lib/redis-key-counter');

    describe('should return client result', () => {
        let fakeClient = {};

        fakeClient.keyCounters = { zset: [ 'temp' ] };
        fakeClient.zcount = (arr, cb) => {
            cb(null, expectedKeyCount);
        };

        keyCounter.count(fakeClient, (err, res) => {
            res.key.should.be.exactly('temp');
            res.count.should.be.exactly(expectedKeyCount);
        });
    });
});
