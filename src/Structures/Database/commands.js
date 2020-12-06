const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    procu: {type: String, default: "comandos"},
    cmd: Number,
});

module.exports = mongoose.model('cmd', Schema);