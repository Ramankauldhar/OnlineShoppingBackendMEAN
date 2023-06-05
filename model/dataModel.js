const mongoose = require("mongoose");

const productsInfoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const ProductsInfo = mongoose.model("ProductsInfo", productsInfoSchema);

module.exports = ProductsInfo;
