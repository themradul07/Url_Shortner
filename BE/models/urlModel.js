const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, unique: true, default: () =>{ return `${process.env.BASE_URL}/${nanoid(10)}` }},
  click: { type: Number, default: 0 },
}, { timestamps: true,});


const Url = mongoose.model('Url', urlSchema);
module.exports = Url;

