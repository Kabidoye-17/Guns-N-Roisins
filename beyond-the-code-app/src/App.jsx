import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Episode1QuizPage from './Episode1QuizPage';
import EpisodeDetailPage from './EpisodeDetailPage';

function App() {
  return (
    <Router basename="/Guns-N-Roisins">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/episode1" element={<Episode1QuizPage />} />
        <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
