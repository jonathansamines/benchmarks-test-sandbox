import cronometro from 'cronometro';
import debug from 'debug';


function base() {
    debug('some message');
}

function withSimpleInterpolations() {
    debug('some message %s', 'with interpolations');
}

function withJSONInterpolation() {
    debug('some message %j', { message: 'with interpolations' });
}

const settings = { print: { compare: true }};

cronometro({ base, withSimpleInterpolations, withJSONInterpolation }, settings);