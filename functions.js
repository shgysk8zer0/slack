export const createFactory = constructor => (...args) => new constructor(...args);
