const mongoose = require ('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
  user: { type: String, required: true },
  scenario:{
    subject: { type: String, required: true },
    question: { type: String, required: true },
    answers: { type: [String], required: true }
   },
  values: { type: [number], required: true }
});

module.exports = mongoose.model("Vote", voteSchema);
