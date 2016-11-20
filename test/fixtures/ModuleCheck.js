module.exports = {
    checkImports: function() {
        require('./imports').check();
        return 'import and export: ok';
    }
}