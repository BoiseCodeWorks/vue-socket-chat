var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  body: { type: String, required: true },
  created: { type: Number, default: Date.now() },
  creator: {
    id: { type: ObjectId, ref: models.user.name, required: true },
    name: { type: String }
  }

});

module.exports = mongoose.model(models.message.name, schema);