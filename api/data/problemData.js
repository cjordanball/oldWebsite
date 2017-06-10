'use strict';

const Easy = require ('./easy/all').Obj;
const Medium = require ('./medium/all').Obj;
const Hard = require ('./hard/all').Obj;
const Misc = require ('./misc/all').Obj;


let Obj = Object.assign({}, Easy, Medium, Hard, Misc);


module.exports = {
   Obj
}
