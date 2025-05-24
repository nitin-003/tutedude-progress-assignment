const express = require("express");
const router = express.Router();
const { getProgress, updateProgress } = require("../controllers/progressControllers");

router.get("/:userId/:videoId", getProgress);
router.post("/update", updateProgress);

module.exports = router;






