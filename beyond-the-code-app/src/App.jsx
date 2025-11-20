import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EpisodeQuizPage from './EpisodeQuizPage';
import EpisodeDetailPage from './EpisodeDetailPage';

function App() {
  return (
    <Router basename="/Guns-N-Roisins">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/episode/:episodeId" element={<EpisodeQuizPage />} />
        <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
