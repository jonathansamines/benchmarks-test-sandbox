'use strict';

const debug = require('debug');
const bench = require('fastbench');

function base(done) {
    debug('some message');
    done();
}

function withSimpleInterpolations(done) {
    debug('some message %s', 'with interpolations');
    done();
}

function withJSONInterpolation(done) {
    debug('some message %j', { message: 'with interpolations' });
    done();
}

const run = bench([
    base,
    withSimpleInterpolations,
    withJSONInterpolation,
], 1000);

run(() => process.nextTick(run));