const express = require("express");
const router = express.Router();
const tvcontroller = require('../controllers/tvcontroller');

router.get("/trending", tvcontroller.getTrending);
router.get("/trailers/:id", tvcontroller.getTrailer);
router.get("/details/:id", tvcontroller.getTvDetails);
router.get("/similar/:id", tvcontroller.getSimilarTvs);
router.get("/:category", tvcontroller.getTvsByCategory);

module.exports = router;