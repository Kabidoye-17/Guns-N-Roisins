import { useParams } from 'react-router-dom';
import EmbedPage from './EmbedPage';
import quizData from './quizzes/episode1-variables.json';
import episodes from './episodes.json';

const accentColors = {
  yellow: '#fff79e',
  pink: '#ffbaf7',
  green: '#C1FFBA',
  blue: '#BAEFF5',
  purple: '#8d75e6'
};

/**
 * Episode Quiz Page - Dynamically loads quiz based on episode
 *
 * This component demonstrates how to use the quiz functionality
 * with a JSON-based quiz definition or ethical dilemmas from gameContent.
 */
function Episode1QuizPage() {
  // Get the episode ID from the URL parameter
  const { episodeId } = useParams();
  const episodeIndex = parseInt(episodeId) - 1;

  // Get the accent color from the episode data
  const episode = episodes[episodeIndex];
  const accentColor = accentColors[episode?.colorTheme] || accentColors.yellow;

  const handleQuizComplete = (score, total) => {
    console.log(`Quiz completed: ${score}/${total}`);
    // You can add additional logic here, such as:
    // - Save progress to localStorage
    // - Update user progress in a database
    // - Unlock achievements
    // - Navigate to next episode
  };

  if (!episode) {
    return <div>Episode not found</div>;
  }

  // Check if episode has gameContent (like ethical dilemmas)
  let gameData = quizData;
  let gameTitle = quizData.title;
  let gameDescription = quizData.description;
  let gameInstructions = [
    "Read each question carefully",
    "Select the answer you think is correct",
    "Click 'Submit Answer' to check your response",
    "Review the explanation to learn more",
    "Click 'Next Question' to continue"
  ];

  if (episode.gameContent && episode.gameContent.type === 'ethical-dilemmas') {
    // Transform ethical dilemmas into quiz format
    gameData = {
      title: `${episode.title} - Ethical Dilemmas`,
      description: episode.gameContent.about || `Test your ethical decision-making with real-world scenarios`,
      questions: episode.gameContent.scenarios.map(scenario => ({
        id: scenario.id,
        question: `${scenario.title}\n\n${scenario.description}`,
        options: scenario.options.map(option => ({
          text: option.text,
          correct: option.correct === true, // Convert true/false/null to true/false
          feedback: option.feedback
        })),
        explanation: scenario.options.find(opt => opt.correct === true)?.feedback ||
                    scenario.options[0]?.feedback // Use first feedback if no correct answer
      }))
    };
    gameTitle = gameData.title;
    gameDescription = gameData.description;
    gameInstructions = episode.gameContent.howToPlay?.steps || [
      "Read each ethical dilemma carefully",
      "Consider the implications of each option",
      "Select the option you believe is most ethical",
      "Review the feedback to see different perspectives",
      "Learn from the community's responses"
    ];
  }

  return (
    <EmbedPage
      gameType="quiz"
      quizData={gameData}
      onQuizComplete={handleQuizComplete}
      title={gameTitle}
      description={gameDescription}
      accentColor={accentColor}
      backLink={`/episode/${episodeId}`}
      instructions={gameInstructions}
    />
  );
}

export default Episode1QuizPage;
