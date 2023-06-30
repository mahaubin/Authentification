const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      minLength: 3,
      maxLength: 120
    },
    prenom: {
      type: String,
      minLength: 3,
      maxLength: 120
    },
   
    email: {
      type: String,
      validate: [isEmail],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);