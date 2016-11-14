const context = require.context('.', true, /tests.[jt]sx?$/);
context.keys().forEach((key) => {
    context(key);
});

module.exports = context;
