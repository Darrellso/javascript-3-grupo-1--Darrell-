//cahe.js
export const eventCache = new Proxy(
  {},
  {
    has(target, category) {
      return target.hasOwnProperty(category);
    },
    get(target, category) {
      return target[category];
    },
    set(target, category, events) {
      target[category] = events;
      return true;
    }
  }
);

