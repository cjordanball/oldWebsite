'use strict';

const Data = require ('../data/problemData').Obj;


module.exports = {
    prepProblem: function(param) {
        var problem = Data[param];

        return problem;
    }
}