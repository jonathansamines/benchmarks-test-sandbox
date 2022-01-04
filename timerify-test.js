'use strict';

const debug = require('debug');
const perf = require('perf_hooks');

function base() {
    debug('some message');
}

function withSimpleInterpolations() {
    debug('some message %s', 'with interpolations');
}

function withJSONInterpolation() {
    debug('some message %j', { message: 'with interpolations' });
}

function timed(fn) {
    const histogram = perf.createHistogram();
    const timedFn = perf.performance.timerify(fn, { histogram });

    return [timedFn, histogram];
}

function bench(series = [], iterations = 1) {
    const timedSeries = series.map((fn) => timed(fn));

    return function run(cb) {
        for (const [timedFn, histogram] of timedSeries) {
            histogram.reset();
            for (let index = 0; index < iterations; index++) timedFn();

            console.log('%s (mean=%s ms, min=%s ms, max=%s ms)', timedFn.name, histogram.mean / 1e6, histogram.min / 1e6, histogram.max / 1e6);
        }

        cb?.();
    }
}

const run = bench([
    base,
    withSimpleInterpolations,
    withJSONInterpolation,
], 1000);

run(() => process.nextTick(run));