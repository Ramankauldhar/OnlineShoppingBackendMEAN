const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ProductsInfo = require("./model/dataModel");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use("/uploads", express.static("uploads"));
// Connect to MongoDB
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://raman:Raman@cluster0.mugsatz.mongodb.net/ShoppingDB?retryWrites=true&w=majority"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("Mongo DB connected");
}

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API route to add New Product in Database
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { file, body } = req;
    const { id, title, price, description, category } = body;

    // Save the image details to MongoDB
    const product = new ProductsInfo({
      id,
      title,
      price,
      description,
      category,
      filename: file.originalname,
      path: file.path,
    });

    const savedData = await product.save();
    res.json({ success: true, image: savedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save image" });
  }
});

//Api to get the list of all the products from database

app.get("/api/getProducts", async (req, res) => {
  try {
    const products = await ProductsInfo.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// API to search for the product by id
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductsInfo.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
const port = 9090;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));
