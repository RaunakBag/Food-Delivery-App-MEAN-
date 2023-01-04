const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      unique:true
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
