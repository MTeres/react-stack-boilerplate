import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export const composeMutations = (...mutations) => (state, action) =>
  mutations.reduceRight((mutatedState, mutation) => mutation(mutatedState, action), state);

// Wrap Redux reducer definition to simplify the implementation
export const createReducer = (initialState, handlers) =>
  (state = initialState, action) =>
    (Object.prototype.hasOwnProperty.call(handlers, action.type)
      ? handlers[action.type](state, action)
      : state);

// Extend asynchronous event types with explicit status
export const createAsyncTypes = constant => ({
  REQUEST: `${constant}.REQUEST`,
  SUCCESS: `${constant}.SUCCESS`,
  ERROR: `${constant}.ERROR`,
});

export const flatNormalizer = array => array.reduce((acc, c) => ({
  ...acc,
  [c.id]: c,
}), {});

// transform _id to id recursively on model object or collection of objects
export const removeUnderscoredId = model => {
  let updated = model;
  if (isArray(model)) {
    return model.map(m => removeUnderscoredId(m));
  }
  if (isObject(model)) {
    const keys = Object.keys(updated);
    if (keys.length > 0 && keys.indexOf('_id') > -1) {
      updated = keys.reduce((prev, curr) => {
        return curr === '_id'
          ? {
            ...prev,
            id: model[curr],
          }
          : {
            ...prev,
            [curr]: (isObject(model[curr]) || isArray(model[curr]))
              ? removeUnderscoredId(model[curr]) : model[curr],
          };
      }, {});
    }
  }
  return updated;
};
