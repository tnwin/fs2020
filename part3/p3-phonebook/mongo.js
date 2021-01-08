/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
const mongoose = require('mongoose');

// Print the commands to run mongo.js
const printInstructions = () =>
  console.log(`
  Start mongo with either of the following:
  (1) Find all contacts with 'node mongo.js <password>'
  (2) Save a new contact with 'node mongo.js <password> <name> <number>'
  E.g., $ node mongo.js "First Last" 012-3456789
  `);

// Check for bad arguments
// if (process.argv.length < 3) {
//   printInstructions();
//   process.exit(1);
// }
// if (process.argv.length === 4) {
//   console.log();
//   console.log("Don't forget your password!");
//   console.log('You must input either both/neither a name and a number!');
//   printInstructions();
//   process.exit(1);
// }
// if (process.argv.length >= 6) {
//   console.log();
//   console.log('Too many arguments!');
//   printInstructions();
//   process.exit(1);

switch (true) {
  case process.argv.length < 3:
    printInstructions();
    process.exit(1);
    break;
  case process.argv.length === 4:
    console.log();
    console.log("Don't forget your password!");
    console.log('You must input either both/neither a name AND a number!');
    printInstructions();
    process.exit(1);
    break;
  case process.argv.length >= 6:
    console.log();
    console.log('Too many arguments!');
    printInstructions();
    process.exit(1);
    break;
  default:
    break;
}

// Password is the third argument
const password = process.argv[2];

// const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;
// mongodb+srv://fullstack:<password>@cluster0.sga3t.mongodb.net/<dbname>?retryWrites=true&w=majority
const url = `mongodb+srv://fullstack:${password}@cluster0.sga3t.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

switch (true) {
  case process.argv.length === 3:
    console.log('phonebook:');
    Person.find({})
      .then((result) => {
        result.forEach((person) =>
          console.log(`${person.name} ${person.number}`),
        );
        mongoose.connection.close();
      })
      .catch((e) => {
        console.log('Error finding persons', e);
        console.log('Error retrieving and displaying contacts');
        mongoose.connection.close();
      });
    break;

  case process.argv.length === 5:
    {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });
      person
        .save()
        .then(() => {
          console.log(
            'Saving person:',
            `${person.name} ${person.number} saved!`,
          );
          mongoose.connection.close();
        })
        .catch((e) => {
          console.log('Error adding person', e);
          console.log(
            `Error adding ${person.name} ${person.number} to database`,
          );
          mongoose.connection.close();
        });
    }
    break;
  default:
    break;
}
