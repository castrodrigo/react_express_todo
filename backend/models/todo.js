let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let collection = 'todo';

let TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    finished: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, //TODO Criar relacao via aplicacao
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model(collection, TodoSchema);
