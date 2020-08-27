const {
  pipe,
  pickAll,
  map,
  ifElse,
  isNil,
  always,
  identity,
  curry,
  reduce,
  assoc,
  prop,
  keys,
  uncurryN,
} = require('ramda')

// ------------------------------------
// pick all provided keys from object
// ... with null instead of undefined
// ------------------------------------

module.exports.pickAll = uncurryN(2, _keys => pipe(pickAll(_keys), map(ifElse(isNil, always(null), identity))))

// ------------------------------------
// rename keys in object
// ------------------------------------

module.exports.renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(prop(key, keysMap) || key, prop(key, obj), acc), {}, keys(obj)),
)
