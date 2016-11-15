/* @flow */
'use strict';
const     _ = require('lodash');

import {createChainableTypeChecker} from 'react-chainable-type-checker';



function mapOfStringToBoolean(allowNullValues: boolean, allowUndefinedValues: boolean) : F1 {
    function _mapOfStringToBoolean(props: any, propName: string, componentName: string, location: any) {
        componentName = componentName || 'anonymous';
        const msb = props[propName];
        if (msb===null)
            return null;
        if (!msb instanceof Map)
            throw new Error( `${propName} passed in ${componentName} is not a Map` );
        else {
            const entries = Array.from(msb.entries());
            for (let i = 0 ; i < entries.length ; i++) {
                const s = entries[i][0];
                if (typeof(s)!==typeof(''))
                    throw new Error(`The ${i}-th (zero indexed) *key* of the Map [${propName}] passed in ${componentName} is not a string: [${s}].\n`);
                const b = entries[i][1];
                const msgPref : string = `The ${i}-th (zero-indexed) *value* of the Map [${propName}] passed in ${componentName} is`;
                if (b===null) {
                    if (!allowNullValues)
                        throw new Error(`${msgPref} null -`);
                    else
                        continue;
                }
                if (b===undefined) {
                    if (!allowUndefinedValues)
                        throw new Error(`${msgPref} undefined -`);
                    else
                        continue;
                }
                if (!_.isBoolean(b)) // this checks both primitives and Boolean wrappers
                    throw new Error(`${msgPref} not a Boolean: [${b}] -`);
            }
        }
        return null; // assume all OK
    }
    return _mapOfStringToBoolean;
}



exports.mapOfStringToBoolean = mapOfStringToBoolean;

