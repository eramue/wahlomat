const mongoose = require ('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema({
subject: { type: String, required: true },
question: { type: String, required: true },
answers: { type: [String], required: true }
});

module.exports = mongoose.model("Story", storySchema);
