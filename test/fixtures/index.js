var SyntaxCheck = require('./SyntaxCheck');
var ModuleCheck = require('./ModuleCheck');

console.log(SyntaxCheck.objectDestructuring());
console.log(SyntaxCheck.blockScopingBindings());
console.log(SyntaxCheck.arrowFunction());
console.log(SyntaxCheck.untaggedTemplateString('world'));
console.log(SyntaxCheck.objectAssign());
console.log(ModuleCheck.checkImports());