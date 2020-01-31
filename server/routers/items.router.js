const router = require("express").Router();
const multer = require("multer");
const {
  items: { postItem }
} = require("../controllers");

// let bodyParser = {
//   json: { limit: "50mb", extended: true },
//   urlencoded: { limit: "50mb", extended: true }
// };

router.post("/", bodyParser, postItem);

module.exports = router;
