const express = require("express");
const { addOrder, getOrder } = require("../controllers/order");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getOrder);
router.post("/addOrder", auth, addOrder);

module.exports = router;
