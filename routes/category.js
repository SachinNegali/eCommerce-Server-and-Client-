const express = require("express");
const router = express.Router()

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");


//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// create route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

// read route
router.get("category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// update Rroute
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete route
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);



module.exports = router;
