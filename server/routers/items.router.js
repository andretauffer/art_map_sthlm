const router = require("express").Router();
const multer = require("multer");
const {
  items: { postItem, getAdresses }
} = require("../controllers");

router.get("/adress", getAdresses);
router.post("/", postItem);

module.exports = router;
