import mongoose from "mongoose";

// schema...
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

// model...
const foodModel = mongoose.model.food || mongoose.model("food", foodSchema);

export default foodModel;
