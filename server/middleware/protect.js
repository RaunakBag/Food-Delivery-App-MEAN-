const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect is for verification of user based on 'token'
const protect = async (req, res, next) => {
  console.log("It is logged in protect ...");
  // let token = req.headers.authorization;

  // token = token.split(" ");
  // console.log(token);
  // token = token[1];
  var token = req.headers.authorization.split(' ')[1];
  console.log("token ---", token);

  const decodedUser = jwt.verify(
    token,
    "This secret key is used to encrypt the payload and generate the token"
  );

  console.log("decodedUser --- ", decodedUser);
  req.user = decodedUser;

  console.log("user role ----", req.user.role);
  // Verifying the user if this user exists in data base on not ?
  const userFound = await User.findOne({ id: decodedUser.id });

  console.log("userFound ----- ", userFound);

  if (userFound) {
    console.log("the next below is called ..");
    next(); // "next" method calls up the next middleware function in the series..
  } else {
    res.json({ message: "Invalid user, doesn't have a valid token" });
  }
};



module.exports = protect;
