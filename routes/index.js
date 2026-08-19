var express = require("express");
var router = express.Router();

router.get("/healthy", function (req, res, next) {
  res.status(200).json({ success: "Application is running" });
});

module.exports = router;
