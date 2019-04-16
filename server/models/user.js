const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

//virtual field
userSchema.virtual("password")
.get(function() { return this._password })
.set(function(password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
})

// methods
userSchema.methods = {
  encryptPassword: function(password) {
    if(!password) return "";
    try {
      return crypto
      .createHmac('sha256', this.salt)
      .update(password)
      .digest('hex');
    }
    catch(err) {
      return "";
    }
  },
  comparePassword: function(password) {
    return this.hashed_password === this.encryptPassword(password);
  }
}

module.exports = mongoose.model("User", userSchema);