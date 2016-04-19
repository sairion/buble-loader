'use strict';

module.exports = {
    /*
    // NOT WORKING
    objectDestructuring({ a, b, c } = {}) {
        return [a, b, c];
    },
    */
    blockScopingBindings() {
        let a = 1;
        {
            let a = 2;
        }
        console.assert(a === 1);

        const b = 10;
        // b = 100; // throws error
        console.assert(b === 10);

        return 'blockScopingBindings(): ok';
    },
    arrowFunction() {
        const I = x => x;
        const K = (x, y) => () => x;
        const S = (x, y, z) => x(z)(y(z));

        console.assert(I(10) === 10);
        console.assert(K(10)() === 10);

        return 'arrowFunction(): ok';
    },
    untaggedTemplateString() {
        const world = 'world';
        console.assert(`hello ${world}` === 'hello world');

        return 'untaggedTemplateString(): ok';
    },
};
