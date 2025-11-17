import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EmbedPage from './EmbedPage';
import Episode1QuizPage from './Episode1QuizPage';

function App() {
  return (
    <Router basename="/Guns-N-Roisins">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/embed" element={
          <EmbedPage
            embedUrl="https://crosswordlabs.com/embed/ise-222"
            title="ISE 222 Crossword Puzzle"
            description="Test your knowledge of ISE 222 concepts with this interactive crossword puzzle. Complete all the clues to master the course material!"
            difficulty="Medium"
            category="Educational"
            instructions={[
              "Click on a numbered square to see the clue",
              "Type your answer directly into the crossword grid",
              "Use the 'Check' button to verify your answers",
              "Click 'Reveal' if you need help with a specific word",
              "Complete all words to finish the puzzle!"
            ]}
          />
        } />
        <Route path="/quiz/episode1" element={<Episode1QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
