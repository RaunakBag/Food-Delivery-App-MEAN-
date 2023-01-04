const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please enter a name"],
    index: {
      unique: true,
    },
    match:
    "^[A-Za-z][A-Za-z0-9_]{7,29}$ ", },
  lastName: {
    type: String,
    required: [true, "please enter a name"],
    index: {
      unique: true,
    },
    match:
   " ^[A-Za-z][A-Za-z0-9_]{7,29}$ ", },
  email: {
    type: String,
    required: [true, "please enter an email"],
    index: {
      unique: true,
    },
    match:
      /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
  },



  cartProducts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Food",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Binding up some methods to the userschema for the succesful registration and login of a user..
// Hashing the password on user registration...
userSchema.pre("save", async function () {
  // Some time consuming stuff
  // Async functions are not executed on main-thread because they may block the main-thread.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparing the database-password & entered-password on login..
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating the Token to be sent to client on register and login..
userSchema.methods.getSignedJwtToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    "This secret key is used to encrypt the payload and generate the token"
  );

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
