const router = require("express").Router();
const {
  items: { postItem }
} = require("../controllers");

router.post("/", postItem);

module.exports = router;
