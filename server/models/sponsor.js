"use strict";
/*eslint-disable */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const sponsorSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true }
})
const Model = mongoose.model('Sponsor', sponsorSchema);
module.exports = Model;