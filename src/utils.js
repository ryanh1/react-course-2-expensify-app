console.log('utils.js is running');

const square = (x) => x * x;
const add = (a, b) => a + b;
export const addAgain = (a, b) => a + b;

const subtract = (a, b) => a - b;

const isSenior = (age) => age >= 65;

// this is not an object definition
// named exports because we export a function or object by name
export { square, add, subtract, isSenior as default };
