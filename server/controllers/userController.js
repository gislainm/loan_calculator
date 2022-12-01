"use strict";
/*eslint-disable */

const Sponsor = require("../models/sponsor")
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseInfo = require('../models/responseInfo');
const { ObjectId } = require('mongodb');
let SECRET;

exports.authenticate = (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ");
    try {
        let permission = jwt.verify(token, SECRET);
        res.status(200).json(new responseInfo(false, null, permission));
    } catch (err) {
        console.log(err)
        res.status(401).json(new responseInfo(true, "Invalid JWT permission", null));
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password;
    SECRET = "login key for sloan-buddy users";
    const user = await User.findOne({ "email-address": email });
    if (user) {
        const validatePwd = await bcrypt.compare(password, user.password);
        if (validatePwd) {
            const accessToken = jwt.sign({
                id: user._id,
                email: user.email,
                iat: Date.now()
            }, SECRET);
            res.status(200).json(new responseInfo(false, null, {
                accessToken: accessToken,
                user: user
            }));
        } else {
            res.status(400).json(new responseInfo(true, 'wrong password', null));
        }
    } else {
        res.status(400).json(new responseInfo(true, 'wrong email', null));
    }
}

exports.signUp = async (req, res, next) => {
    const newuser = new User(req.body);
    try {
        await newuser.save()
        res.status(201).json(new responseInfo(false, null, newuser));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "User already exist. Login instead!", null));
    }
}

exports.updateUser = async (req, res, next) => {
    const email = req.body.email;
    try {
        await User.updateOne({ "email-address": email }, { ...req.body.paymentInfo });
        let updatedUser = await User.findOne({ "email-address": email });
        res.status(201).json(new responseInfo(false, null, updatedUser));
    } catch (erro) {
        res.status(500).json(new responseInfo(true, "Updating user's Info failed", null));
    }
}

exports.getUserInfo = async (req, res, next) => {
    const email = req.params.email;
    try {
        let user = await User.findOne({ "email-address": email });
        res.status(201).json(new responseInfo(false, null, updatedUser));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "User can't be found", null));
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find();
        res.status(201).json(new responseInfo(false, null, users));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Users can't be found", null));
    }
}

exports.deleteUser = async (req, res, next) => {
    let email = req.params.email;
    try {
        let response = await User.deleteOne({ "email-address": email });
        res.status(201).json(new responseInfo(false, null, response));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Deleting user failed", null));
    }
}

exports.getAllSponsors = async (req, res, next) => {
    try {
        let sponsors = await Sponsor.find();
        res.status(201).json(new responseInfo(false, null, sponsors));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Sponsors can't be found", null));
    }
}

exports.addSponsor = async (req, res, next) => {
    const newSponsor = new Sponsor(req.body);
    try {
        await newSponsor.save()
        res.status(201).json(new responseInfo(false, null, newSponsor));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Saving new sponsor failed", null));
    }
}

exports.deleteSponsor = async (req, res, next) => {
    let sponsorName = req.params.name;
    try {
        let response = await Sponsor.deleteOne({ name: sponsorName });
        res.status(201).json(new responseInfo(false, null, response));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Deleting sponsor failed", null));
    }
}