import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Box, Card, CardContent, Typography, Paper } from "@mui/material";

const userId = "nitin_123";
let videoId = 1;
const backendUrl = "http://localhost:5000/api/progress";

const VideoPlayer = () => {
  const playerRef = useRef(null);
  const [watchedSeconds, setWatchedSeconds] = useState(new Set());
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const newSecondsRef = useRef(new Set());

  useEffect(() => {
    axios
      .get(`${backendUrl}/${userId}/${videoId}`)
      .then((res) => {
        const {
          watchedSeconds = [],
          duration = 0,
          lastWatchedPosition = 0,
        } = res.data;
        const watchedSet = new Set(watchedSeconds);
        setWatchedSeconds(watchedSet);
        setDuration(duration);
        setLastPosition(lastWatchedPosition);
        setProgress(((watchedSet.size / duration) * 100).toFixed(2));
      })
      .catch((err) => console.error("GET progress error:", err));
  }, []);

  const handleProgress = ({ playedSeconds }) => {
    const current = Math.floor(playedSeconds);

    if (!watchedSeconds.has(current)) {
      watchedSeconds.add(current);
      newSecondsRef.current.add(current);
      setProgress(((watchedSeconds.size / duration) * 100).toFixed(2));
    }

    if (current % 5 === 0 && newSecondsRef.current.size > 0) {
      const newSecArr = Array.from(newSecondsRef.current);
      axios
        .post(`${backendUrl}/update`, {
          userId,
          videoId,
          newSeconds: newSecArr,
          duration,
          lastWatchedPosition: current,
        })
        .then(() => {
          console.log("Progress saved");
          newSecondsRef.current.clear();
        })
        .catch((err) => {
          console.error(
            "POST update error:",
            err.response?.data || err.message
          );
        });
    }
  };

  const completedWatching = () => {
    videoId += 1;
  };

  const WatchedBar = ({ secondsSet, totalDuration }) => {
    const intervals = [];
    const sorted = Array.from(secondsSet).sort((a, b) => a - b);

    let start = sorted[0];
    let prev = start;

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === prev + 1) {
        prev = sorted[i];
      } else {
        intervals.push({ start, end: prev + 1 });
        start = sorted[i];
        prev = start;
      }
    }

    if (start !== undefined) {
      intervals.push({ start, end: prev + 1 });
    }

    return (
      <Box
        sx={{
          position: "relative",
          height: 10,
          borderRadius: 5,
          backgroundColor: "#f44336",
          mt: 1,
        }}
      >
        {intervals.map((intv, idx) => {
          const left = (intv.start / totalDuration) * 100;
          const width = ((intv.end - intv.start) / totalDuration) * 100;
          return (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                left: `${left}%`,
                width: `${width}%`,
                height: "100%",
                backgroundColor: "#4caf50",
                borderRadius: 5,
              }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 2 }}>
          <ReactPlayer
            ref={playerRef}
            url="https://www.youtube.com/watch?v=ZTsGdNkptfY"
            controls
            playing
            onProgress={handleProgress}
            onDuration={setDuration}
            onReady={() => playerRef.current.seekTo(lastPosition)}
            progressInterval={1000}
            width="100%"
            height="360px"
            onEnded={completedWatching}
          />
        </Paper>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1">
            Progress: {progress}% of the video
          </Typography>
          <WatchedBar secondsSet={watchedSeconds} totalDuration={duration} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;



