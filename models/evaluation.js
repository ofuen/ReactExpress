var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Oid = mongoose.Schema.Types.ObjectId;

var evalSchema = new Schema({
    userId: Oid,
    surveyName: String,
    answers: [Number],
    points: Number, 
    date: { type: Date, default: Date.now }
});

var Evaluation = mongoose.model("Evaluation", evalSchema);

module.exports = Evaluation;
