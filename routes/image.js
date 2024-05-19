const express = require("express");
const { image } = require("../controllers/image");
const router = express.Router();

router.get("/:imagePath", image);

module.exports = router;
