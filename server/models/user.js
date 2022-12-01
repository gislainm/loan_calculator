"use strict";
/*eslint-disable */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    "email-address": { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalPayment: { type: Number, required: false },
    totalInterest: { type: Number, required: false },
    totalLoan: { type: Number, required: false },
    monthlyPayment: { type: Number, required: false },
    interest: { type: Number, required: false },
    term: { type: Number, required: false }
})
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});
const Model = mongoose.model('User', userSchema);
module.exports = Model;