/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose'); // Making our lives easier w/ Mongoose

// For unique validation in schema
const uniqueValidator = require('mongoose-unique-validator');

// URL
// eslint-disable-next-line no-undef -- for process.*
const url = process.env.MONGODB_URI;

// C-Log connecting URI
console.log('**** Connecting to...', url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Addressing deprecation of findONeAndUpdate()
    useCreateIndex: true, // Addressing deprecation of collection.ensureIndex
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => {
    console.log(
      '==================------Failed to connect!------==================',
    );
    console.log('Error:', err.message);
  });

// Schema definition for a person/contact w/o validation
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// Schema with validation
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    validate: {
      // See Mongoose Custom Validators docs
      validator: (v) => /(.*[0-9]){8}/.test(v),
      message: (props) => `${props.value} does not contain at least 8 digits!`,
    },
    required: true, // Added b/c it can't be blank anyways
  },
});

// Stringify _id to id
// Remove _id and __v from public view
// id was object so this changes it to a string
// required for tests later on
personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

personSchema.plugin(uniqueValidator); // For unique validation in schema

// CommonJS exporting this file as 'Contact'
module.exports = mongoose.model('Person', personSchema);
