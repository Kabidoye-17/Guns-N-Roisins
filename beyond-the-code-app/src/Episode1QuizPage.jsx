import EmbedPage from './EmbedPage';
import quizData from './quizzes/episode1-variables.json';

/**
 * Episode 1 Quiz Page - Example usage of the quiz system
 *
 * This component demonstrates how to use the quiz functionality
 * with a JSON-based quiz definition.
 */
function Episode1QuizPage() {
  const handleQuizComplete = (score, total) => {
    console.log(`Quiz completed: ${score}/${total}`);
    // You can add additional logic here, such as:
    // - Save progress to localStorage
    // - Update user progress in a database
    // - Unlock achievements
    // - Navigate to next episode
  };

  return (
    <EmbedPage
      gameType="quiz"
      quizData={quizData}
      onQuizComplete={handleQuizComplete}
      title={quizData.title}
      description={quizData.description}
      difficulty={quizData.difficulty}
      category={quizData.category}
      instructions={[
        "Read each question carefully",
        "Select the answer you think is correct",
        "Click 'Submit Answer' to check your response",
        "Review the explanation to learn more",
        "Click 'Next Question' to continue"
      ]}
    />
  );
}

export default Episode1QuizPage;
