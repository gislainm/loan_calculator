"use strict";
/*eslint-disable */

const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/update', userController.updateUser);
router.get("/authenticate", userController.authenticate);
router.get("/user/:email", userController.getUserInfo);

router.get("/allUsers", userController.getAllUsers);
router.delete("/deleteUser/:email",userController.deleteUser);
router.get("/allSponsors",userController.getAllSponsors);
router.post("/sponsor",userController.addSponsor);
router.delete("/deleteSponsor/:name",userController.deleteSponsor);

module.exports = router;