"use strict";
var my_uppercase_pipe_1 = require('./my-uppercase.pipe');
describe('MyUppercasePipe', function () {
    var pipe;
    beforeEach(function () {
        pipe = new my_uppercase_pipe_1.MyUppercasePipe();
    });
    it('transforms "abc" to "ABC"', function () {
        expect(pipe.transform('abc')).toEqual('ABC');
    });
    it('transforms "abc def" to "ABC DEF"', function () {
        expect(pipe.transform('abc def')).toEqual('ABC DEF');
    });
    it('leaves "ABC DEF" unchanged', function () {
        expect(pipe.transform('ABC DEF')).toEqual('ABC DEF');
    });
});

//# sourceMappingURL=my-uppercase.pipe.spec.js.map
