const mongoose = require("mongoose")

const { Schema } = mongoose;

const quizSchema =new Schema({

questions: [{
    difficulty: { type: Number },
    text: { type: String },
    options: [{ type: String }],
    correct: [{ type: Number }],
  }],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz