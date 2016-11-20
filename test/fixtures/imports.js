import A from './exports';
import { B } from './exports';
import * as All from './exports';

var assert = require('assert');

module.exports = {
    check: function() {
        assert.equal(A, 'A', 'Default import should be A');
        assert.equal(B, 'B', 'B should be exported as a non-default');
        assert.equal(All.default, 'A', 'Importing with * should expose default export as "default"');
        assert.equal(All.B, 'B', 'Importing with * should expose B export');
        assert.equal(All.C, 'C', 'Importing with * should expose C export');
    }
}