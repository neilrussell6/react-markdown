import {
  assoc,
  compose,
  dissoc,
  groupBy,
  head,
  map,
  mapObjIndexed,
  pipe,
  prop,
  values,
} from 'ramda'

export const denormalize = (keyProp) =>
  compose(
    values,
    mapObjIndexed((value, key) => assoc(keyProp, key, value)),
  )

export const normalize = (keyProp) =>
  pipe(groupBy(prop(keyProp)), map(compose(dissoc(keyProp), head)))
