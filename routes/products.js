const express = require("express");

const {
  products,
  categories,
  getPage,
  subcategory,
  getProduct,
} = require("../controllers/products");

const router = express.Router();

router.get("/", products);
router.get("/categories", categories);
router.get("/categories/Subcategory:id", subcategory);
router.get("/getPage", getPage);
router.get("/:id", getProduct);

module.exports = router;
