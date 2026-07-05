const express = require ("express");
const router = express.Router();
const Stock = require("../models/stock.js");
const Holding = require("../models/holding.js");
const stockController = require("../controllers/stock.js");
const {isLoggedIn} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

//Get route for stock
router.get("/",wrapAsync(stockController.showStocks));

//Post route for buy stock
router.post("/buy", isLoggedIn, wrapAsync(stockController.buyStocks));

//Get route for portfolio
router.get("/portfolio", isLoggedIn, wrapAsync(stockController.portfolio));

//Post route for sell stock
router.post("/sell", isLoggedIn,wrapAsync(stockController.sellStock));



module.exports = router;
