// const person = {
//   name: 'Andrew',
//   age: 26,
//   location: {
//     city: 'Philadelphia',
//     temp: 92
//   }
// }
//
// // Version 1
// // Pull the name and age objects off of person
// const name = person.name;
// const age = person.age;
//
// // Version 2
// // This is equivalent to version 1
// const { name, age } = person;
//
// // Version 3
// // Rename name as firstName
// const {name: firstName } = person;
//
// // Version 4
// // If no name variable exists, set it equal to Anonymous
// const { name = 'Anonymous', age } = person
//
// // Version 5
// // Combination of version 4 and version 5
// const { name: firstName = 'Anonymous', age} = person;

// Array destructuring

// Version 1
const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const city = address[1];
const state = address[2];
console.log(`you are in ${address[1]} ${address[2]}.`);

// Version 2
const [street, city, state, zip] = address;
console.log(`you are in ${city} ${state}.`);

// Version 3
const [street, city, state] = address;
// Destructure items 2 and 3
const [, city, state] = address;

// Version 4
const address = [];
const [, , state = 'New York'] = address;
