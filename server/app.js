const express = require("express");
const connectDB = require("./db/db");
const User = require("./models/User");
const app = express();
const cors = require("cors");
const Food = require("./models/Food");
const protect = require("./middleware/protect");

app.use(express.json());

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.json({ Success: true });
});

// Sign-up
app.post("/signup", async (req, res) => {
  
  const user = await User.create(req.body);

  const token = await user.getSignedJwtToken();

  res.json({ returnedToken: token,user:user });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const enteredMail = email;
  const enteredPassword = password;

  const user = await User.findOne({ email: enteredMail });
  if (user) {
    const isMatch = await user.matchPassword(enteredPassword);
    if (isMatch) {
      // return token
      const token = await user.getSignedJwtToken();
      res.json({ returnedToken: token, user: user });
    } else {
      res.send("Invalid Password");
    }
  } else {
    res.send("Invalid Email ID");
  }
});

// Creating a product..

// We need to protect this route. For that, we will authenticate the incoming token, only then it can create a product..
app.post("/food", protect, async (req, res) => {
  console.log("headers --- ", req.headers.authorization);
  console.log(res);
  const food = await Food.create(req.body);
  res.json({ food, created: true });
});

// Getting all the products..
app.get("/allfood", async (req, res) => {
  const foods = await Food.find();
  res.json({ foods });
});

// Fetch a product by id..
app.get("/allfood/:foodId", async (req, res) => {
  // const foodId = req.params.foodId;
  const food = await Food.findById(req.params.foodId);
  res.json({ food });
});

// ########## Creating API for adding products to the cart of user #################
// ###################################
// #############

app.post("/assignFoodToUser/:foodId", protect, async (req, res, next) => {
  // const userFounded = await User.findById(req.user.id);
  // console.log("userFounded --- ", userFounded);

  const user = await User.findById(req.user.id).select("cartProducts");
  // console.log()

  // Pushing product to the user's cart..
  user.cartProducts.push(req.params.foodId);
  let fi = req.params.foodId;
  // Updating the cartProducts of a specific user...
  const userToBeUpdated = await User.findByIdAndUpdate(req.user.id, {
    cartProducts: user.cartProducts,
  });

  res.json({ success: true, userToBeUpdated, fi });
});

// ########## Creating API for fetching the products in cart of specific user #################
// ###################################
// #############

app.get("/userProduct", protect, async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select("cartProducts")
    .populate("cartProducts");
  res.json(user.cartProducts);
});


app.delete("/buyAll", protect, async (req, res) => {
  // const user = await User.findById(req.user.id).select("cartProducts");
  const user = await User.findByIdAndUpdate(req.user.id, { cartProducts: [] });
  res.json({ success: true });
});

// Port
app.listen(3000, () => {
  console.log("Chole ja bhai");
});
