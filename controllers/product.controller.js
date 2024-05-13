const Product = require("../model/product.model.js");
const jsonData = require("../data.json");

const createProduct = async (req, res) => {
  try {
    const products = await Product.create(jsonData.products);

    if (!products || products.length === 0) {
      return res.status(500).json({ message: "No products created" });
    }

    res
      .status(200)
      .json({ products, message: "Products created successfully" });
  } catch (error) {
    console.error("Error creating products:", error);
    res.status(500).json({ message: "Error creating products" });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // const allProducts = await Product.find(req.query);
    if (!allProducts) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(200)
      .json({ products: allProducts, message: "Products fetch successfully" });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Error fetching all products" });
  }
};
const testingProduct = async (req, res) => {
  try {
    const { brand, title, sort, select, page, limit } = req.query;
    const queryObject = {};

    if (brand) {
      queryObject.brand = brand;
    }
    // if (title) {
    //   queryObject.title = title;
    // }
    if (title) {
      //we also add $options:i if needed
      queryObject.title = { $regex: title };
    }

    let apiData = Product.find(queryObject);
    if (sort) {
      let fixSort = sort.replace(",", " "); //sort=name,price  sort(name price)
      // queryObject.sort=fixSort;
      apiData = apiData.sort(fixSort);
    }
    if (select) {
      // let fixSelect=select.replace(",", " ");
      let fixSelect = select.split(",").join(" ");
      apiData = apiData.select(fixSelect);
    }

    let pageNumber = Number(page) || 1; //let page = Number(req.query.page);
    let pageLimit = Number(limit) || 2; // let limit = 2;
    let skip = (pageNumber - 1) * pageLimit;

    apiData = apiData.skip(skip).limit(pageLimit);

    console.log(queryObject);

    const allProducts = await apiData;
    if (!allProducts) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(200)
      .json({ products: allProducts, message: "Products fetch successfully" });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Error fetching all products" });
  }
};
module.exports = { createProduct, fetchAllProducts, testingProduct };
