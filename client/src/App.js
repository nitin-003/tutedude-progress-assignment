import { Container, Typography } from "@mui/material";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Video Progress Tracker
      </Typography>
      <VideoPlayer />
    </Container>
  );
}

export default App;




