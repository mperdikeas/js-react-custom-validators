require('source-map-support').install();
import 'babel-polyfill';
import chai from 'chai';
const assert = chai.assert;
import _ from 'lodash';

import {mapOfStringToBoolean} from '../lib/index.js';

describe('mapOfStringToBoolean', function () {
    it('should be a function'
       , function () {
           assert.isTrue(_.isFunction(mapOfStringToBoolean));
       });
    it('should work in the typical affirmative case'
       , function () {
           const m = new Map();
           m.set('a', true);
           m.set('b', false);
           const props = Object.assign({}, {m:m});;
           const f = mapOfStringToBoolean(false, false);
           assert.isNull(f(props, 'm', 'foo', 'boo'));
       });
    it('should tolerate nulls in values but only if so configured'
       , function () {
           const m = new Map();
           m.set('a', true);
           m.set('b', false);
           m.set('c', null);
           const props = Object.assign({}, {m:m});;           
           assert.isNull(mapOfStringToBoolean(true, false)(props, 'm', 'foo', 'boo'));
           assert.isNull(mapOfStringToBoolean(true, true )(props, 'm', 'foo', 'boo'));           
           assert.throws(()=>{
               mapOfStringToBoolean(false, false)(props, 'm', 'foo', 'boo');
           });
           assert.throws(()=>{
               mapOfStringToBoolean(false, true )(props, 'm', 'foo', 'boo');
           });           
       });
    it('should tolerate undefined in values but only if so configured'
       , function () {
           const m = new Map();
           m.set('a', true);
           m.set('b', false);
           m.set('c', undefined);
           const props = Object.assign({}, {m:m});;
           assert.isNull(mapOfStringToBoolean(false, true)(props, 'm', 'foo', 'boo'));           
           assert.isNull(mapOfStringToBoolean(true , true)(props, 'm', 'foo', 'boo'));
           assert.throws(()=>{
               mapOfStringToBoolean(false, false)(props, 'm', 'foo', 'boo');
           });
           assert.throws(()=>{
               mapOfStringToBoolean(true, false)(props, 'm', 'foo', 'boo');
           });           
       });    
    it('should not tolerate nulls in keys'
       , function () {
           const m = new Map();
           m.set(null, true);
           m.set('b', false);
           const props = Object.assign({}, {m:m});;           
           assert.throws(()=>{mapOfStringToBoolean(false, false)(props, 'm', 'foo', 'boo');});
           assert.throws(()=>{mapOfStringToBoolean(false,  true)(props, 'm', 'foo', 'boo');});
           assert.throws(()=>{mapOfStringToBoolean(true , false)(props, 'm', 'foo', 'boo');});
           assert.throws(()=>{mapOfStringToBoolean(true ,  true)(props, 'm', 'foo', 'boo');});                                 
       });        
});
