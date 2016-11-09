require('source-map-support').install();
import 'babel-polyfill';
const assert     = require('assert');
import _ from 'lodash';

import {mapOfStringToBoolean} from '../lib/index.js';

describe('mapOfStringToBoolean', function () {
    it('should be a function'
       , function () {
           assert(_.isFunction(mapOfStringToBoolean));
       });
});
