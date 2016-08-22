'use strict';

module.exports = {

    objectDestructuring({ a, b, c } = {a: 1, b: '2', c: null}) {
        console.assert(a === 1);
        console.assert(b === '2');
        console.assert(c === null);

        return 'objectDestructuring(): ok';
    },
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
    objectAssign() {
        const x = { a: 1, b: 2 };
        const obj = { ...x };
        return 'objectAssign(): ok';
    }
};
