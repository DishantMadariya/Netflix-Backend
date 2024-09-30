const express = require("express");
const router = express.Router();
const searchcontroller = require('../controllers/searchcontroller');

router.get("/person/:query", searchcontroller.searchPerson);
router.get("/movie/:query", searchcontroller.searchMovie);
router.get("/tv/:query", searchcontroller.searchTv);

router.get("/history", searchcontroller.getSearchHistory);

router.delete("/history/:id", searchcontroller.removeItemFromSearchHistory);

module.exports = router;