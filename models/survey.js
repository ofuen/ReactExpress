var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var surveySchema = new Schema({
  name: { type: String, required: true },
  survey: [
      {
          question: String,
          answers:[String],
          correctanswer: Number
      }
  ],
  date: { type: Date, default: Date.now }
});

var Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
