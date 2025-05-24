const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: String,
  videoId: Number,
  watchedSeconds: [Number],
  duration: Number,
  lastWatchedPosition: Number,
});

module.exports = mongoose.model("Progress", progressSchema);




