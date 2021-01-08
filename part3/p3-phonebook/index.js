/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
// Imports via CommonJS
require('dotenv').config(); // For .env  => required prior to model -> moved to model?
const express = require('express'); // For express
const morgan = require('morgan'); // For logging
const cors = require('cors'); // For cross origin (diff port/hosts)
const Person = require('./models/person'); // For MongoDB/Mongooses

const app = express(); // Setting express() to app for convenient calling

/** *************** =========== /***************** */
/** *************** MIDDLEWARES /***************** */
/** *************** =========== /***************** */
// Pre-routing middlewares

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---------');
  next();
};

app.use(express.static('build')); // For '/build' folder -- rendering static pages (1)
app.use(express.json()); // For express json parson (req.body) (2)
app.use(requestLogger); // For logging (redundant)
// Logging data to console like this can breach local privacy laws
// app.use(morgan('tiny'));
morgan.token('reqBody', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqBody',
  ),
);
app.use(cors()); // For cross origin (diff ports/hosts)

// let persons = [
//   {
//     name: 'Arto Hellas',
//     number: '040-123456',
//     id: 1,
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//     id: 2,
//   },
//   {
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//     id: 3,
//   },
//   {
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//     id: 4,
//   },
// ];

// Generate random integer to be used as id
// Used with hardcoded array of person objects
// const generateId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

// Info page
app.get('/info', (req, res) =>
  // res.end(
  //   `<p>Phonebook has info for ${persons.length} ${
  //     persons.length === 1 ? 'person' : 'people'
  //   }</p>
  //   <p>${new Date()}</p>
  //   `
  // )

  /**
   * Ref. Stackoverflow
   * .count() is deprecated
   * */

  // Count, then do something with it
  Person.countDocuments({}).then((count) => {
    res.end(
      `<p>Phonebook has info for ${count} ${
        count === 1 ? 'person' : 'people'
      }</p>
      <p>${new Date()}</p>
      `,
    );
  }),
);

/**
 * CREATE new person
 */
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  switch (true) {
    case !name: // name is undefined
      return res.status(400).json({ error: 'name missing' });
    case !number: // number is undefined
      return res.status(400).json({ error: 'number missing' });
    // default:
    //   if (persons.find((p) => p.name === name))
    //     return res.status(400).json({ error: 'name must be unique' });
    // default: {
    //   Person.find({ name }).then((found) => {
    //     if (found.name === name)
    //       return res.status(400).json({ error: 'name must be unique' });

    //     const newPerson = new Person({ name, number });
    //     newPerson.save().then((savedPerson) => res.json(savedPerson));
    //   });
    // }
    // }
    default: {
      // if (!name) return res.status(400).json({ error: 'name is missing' });
      // if (!number) return res.status(400).json({ error: 'number is missing' });
      // if (persons.find((p) => p.name === name))
      //   return res.status(400).json({ error: 'name must be unique' });

      // const newPerson = { name, number, id: generateId() };
      const newPerson = new Person({ name, number });
      // persons = persons.concat(newPerson);
      // res.json(newPerson);

      /**
       * This ensures that the response is sent only if the operation succeeded.
       * The savedPerson parameter in  callback function is the saved and newly created person.
       * The data sent back in the response is the formatted version created with the toJSON method.
       */
      // newPerson
      //   .save()
      //   .then((savedPerson) => res.json(savedPerson.toJSON())) // toJSON() optional b/c express**
      //   .catch((err) => next(err));

      // Second iteration
      /**
       * This kind of promise chaining isn't  very beneficial in this case
       * Many asynchronous operations done in sequence would change this
       */
      newPerson
        .save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
        .catch((err) => next(err));
    }
    // This is probably fine in this case
    // newPerson
    //   .save()
    //   .then((savedPerson) => res.json(savedPerson))
    //   .catch((err) => next(err));
  }
});

/**
 *  RETRIEVE all persons
 */
// app.get('/api/persons', (req, res) => res.json(persons));
// Don't need this b/c express internally calls toJSON
// Person.find({}).then((resPersons) => res.json(resPersons.map((p) => p.toJSON())));
app.get('/api/persons', (req, res) =>
  Person.find({}).then((persons) => res.json(persons)),
);

/**
 * RETRIEVE person by id
 *  */
app.get('/api/persons/:id', (req, res, next) => {
  // const foundPerson = persons.find((p) => p.id === Number(req.params.id));
  // foundPerson ? res.json(foundPerson) : res.status(404).end();

  Person.findById(req.params.id)
    .then((foundPerson) =>
      foundPerson ? res.json(foundPerson) : res.status(404).end(),
    )
    .catch((err) => {
      // console.log(
      //   `**** Console.log error: findById(id) rejected for id ${req.params.id}
      // `,
      //   err
      // );
      // res.status(500).end();
      // res.status(400).send({ error: 'malformatted id' });
      next(err);
    });
});

/**
 * UPDATE person by id
 * Update a single person/contact with new number and respond
 */
app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body;

  // 🐛 Adding name will fail the unique validator -- it's redundant anyways
  const person = { number };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true, // Allow validators for this update
  })
    .then((updatedPerson) => {
      console.log('updatedPerson:', updatedPerson);
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

/**
 * DELETE person by id
 * */
app.delete('/api/persons/:id', (req, res, next) => {
  // Filter our deleted
  // persons = persons.filter((p) => p.id !== Number(req.params.id));
  // res.status(204).end();

  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

// MIDDLEWARE post-routes

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

/**
 * Important for middleware for handling unsupported routes
 * to be next to the last middleware that is loaded into Express
 * --just before the error handler.
 * Can't be before routes
 *
 * The only exception to this is the error handler which needs to come at the very end
 * --after the unknown endpoints handler.
 * */

// Handler of requests with unknown endpoints
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(
    `
    **** Console.log error ****
  `,
    err.message,
  );
  console.log();

  switch (err.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: err.message });
    default:
      next(err);
  }
};
// Handler of requests that result to errors
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
