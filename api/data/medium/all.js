'use strict';

const Med1 = require('./med01_05');
const Med2 = require('./med06_10');
const Med3 = require('./med11_15');
const Med4 = require('./med16_20');
const Med5 = require('./med21_25');
const Med6 = require('./med26_30');
const Med7 = require('./med31_35');


let Obj = Object.assign({}, Med1, Med2, Med3, Med4, Med5, Med6, Med7);


module.exports = {
    Obj
};