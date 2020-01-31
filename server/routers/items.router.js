const router = require("express").Router();
const multer = require("multer");
const {
  items: { postItem }
} = require("../controllers");

router.post("/", postItem);

module.exports = router;
