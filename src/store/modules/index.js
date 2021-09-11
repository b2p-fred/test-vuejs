/**
 * Automatically imports all the modules and exports as a single module object
 * ---
 * fixme: This is a great solution but it breaks the PhpStorm syntactic analysis !
 */
const requireModules = require.context(".", false, /\.store\.js$/);
const modules = {};

requireModules.keys().forEach((filename) => {
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename
    .replace(/(\.\/|\.store\.js)/g, "")
    .replace(/^\w/, (c) => c.toUpperCase());

  modules[moduleName] =
    requireModules(filename).default || requireModules(filename);
});

export default modules;
