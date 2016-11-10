var context = require.context('.', true, /tests.[jt]sx?$/);
context.keys().forEach(function(key) {
    context(key);
});
module.exports = context;