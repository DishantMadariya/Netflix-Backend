const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviecontroller");

router.get("/trending", movieController.getTrendingMovies);
router.get("/trailers/:id", movieController.getTrailers);
router.get("/details/:id", movieController.getMovieDetails);
router.get("/similar/:id", movieController.getSimilarMovies);
router.get('/:category', movieController.getMoviesByCategory)
module.exports = router;
