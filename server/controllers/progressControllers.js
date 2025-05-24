const Progress = require("../models/Progress");

// Get progress for a user and video
const getProgress = async (req, res) => {
  const { userId, videoId } = req.params;

  try{
    const progress = await Progress.findOne({ userId, videoId });

    if(!progress) {
      return res.json({
        watchedSeconds: [],
        duration: 0,
        lastWatchedPosition: 0,
      });
    }

    res.json({
      watchedSeconds: progress.watchedSeconds,
      duration: progress.duration,
      lastWatchedPosition: progress.lastWatchedPosition || 0,
    });
  } 
  catch(err){
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

// Update progress
const updateProgress = async (req, res) => {
  const { userId, videoId, newSeconds, duration, lastWatchedPosition } =
    req.body;

  try{
    let progress = await Progress.findOne({ userId, videoId });

    if (!progress) {
      progress = new Progress({
        userId,
        videoId,
        watchedSeconds: newSeconds,
        duration,
        lastWatchedPosition,
      });
    } 
    else{
      const updatedSet = new Set([...progress.watchedSeconds, ...newSeconds]);
      progress.watchedSeconds = Array.from(updatedSet);
      progress.duration = duration;
      progress.lastWatchedPosition = lastWatchedPosition;
    }

    await progress.save();
    res.json({ message: "Progress updated successfully" });
  } 
  catch (err){
    res.status(500).json({ error: "Failed to update progress" });
  }
};

module.exports = {
  getProgress,
  updateProgress,
};



