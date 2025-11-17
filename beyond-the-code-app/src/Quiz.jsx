import styled from 'styled-components';
import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from '@phosphor-icons/react';
import {
  Container,
  Card,
  Label,
  Heading,
  GridContainer,
  InteractiveBox,
  InfoBox,
  ButtonGroup,
  PrimaryButton,
  StatDisplay,
  StatLabel,
  StatValue,
  CenteredText,
  theme
} from './shared/StyledComponents';

// Custom styled components specific to Quiz
const QuestionCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 1px solid ${theme.border};
  background: ${theme.white};
`;

const OptionsContainer = styled(GridContainer)`
  grid-template-columns: ${props => props.optionCount === 2 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)'};
  grid-template-rows: ${props => props.optionCount === 4 ? 'repeat(2, 1fr)' : 'auto'};
  gap: 16px;
`;

const OptionBox = styled(InteractiveBox).attrs(props => ({
  borderColor: props.selected && !props.showResult ? theme.gold :
    props.showResult && props.correct ? theme.success :
    props.showResult && props.selected && !props.correct ? theme.coral :
    theme.border,
  bgColor: props.selected && !props.showResult ? 'rgba(240, 168, 72, 0.08)' :
    props.showResult && props.correct ? 'rgba(45, 191, 140, 0.08)' :
    props.showResult && props.selected && !props.correct ? 'rgba(244, 126, 63, 0.08)' :
    theme.white
}))`
  font-weight: 400;
`;

const ScoreCard = styled(Card)`
  text-align: center;
  border: 1px solid ${theme.border};
`;

const ScoreValue = styled(StatValue)`
  font-size: 56px;
  color: ${props => props.percentage >= 70 ? theme.success : props.percentage >= 50 ? theme.gold : theme.coral};
  margin: 24px 0;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const ScoreMessage = styled.p`
  color: ${theme.textMedium};
  font-size: 16px;
  line-height: 1.6;
  margin: 16px 0 32px 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ScoreBreakdown = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 24px 0;
  padding: 20px;
  background: ${theme.backgroundLavender};
  border-radius: 9px;

  @media (max-width: 768px) {
    gap: 20px;
    flex-direction: column;
  }
`;

function Quiz({ quizData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quizData.questions.length - 1;

  const handleOptionSelect = (optionIndex) => {
    if (!showResult) {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = question.options[selectedOption].correct;
    setAnswers([...answers, { questionId: question.id, correct: isCorrect }]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizComplete(true);
      if (onComplete) {
        const score = [...answers, { correct: question.options[selectedOption].correct }]
          .filter(a => a.correct).length;
        onComplete(score, quizData.questions.length);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setAnswers([]);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const score = answers.filter(a => a.correct).length;
    const total = quizData.questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <Container>
        <ScoreCard padding="48px 32px" mobilePadding="32px 24px">
          <Heading margin="0 0 16px 0" mobileSize="24px">Quiz Complete!</Heading>
          <ScoreValue percentage={percentage}>{percentage}%</ScoreValue>

          <ScoreBreakdown>
            <StatDisplay>
              <StatLabel>Correct</StatLabel>
              <StatValue color={theme.success}>{score}</StatValue>
            </StatDisplay>
            <StatDisplay>
              <StatLabel>Incorrect</StatLabel>
              <StatValue color={theme.coral}>{total - score}</StatValue>
            </StatDisplay>
            <StatDisplay>
              <StatLabel>Total</StatLabel>
              <StatValue color={theme.primary}>{total}</StatValue>
            </StatDisplay>
          </ScoreBreakdown>

          <ScoreMessage>
            {percentage >= 70 && "Excellent work! You've mastered this topic!"}
            {percentage >= 50 && percentage < 70 && "Good effort! Review the material and try again to improve."}
            {percentage < 50 && "Keep learning! Practice makes perfect."}
          </ScoreMessage>
          <PrimaryButton primary onClick={handleRetry}>
            Try Again
          </PrimaryButton>
        </ScoreCard>
      </Container>
    );
  }

  return (
    <Container>
      <QuestionCard padding="60px 48px" mobilePadding="40px 32px" minHeight="180px" radius="11px">
        <Label uppercase marginBottom="20px">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </Label>
        <Heading>{question.question}</Heading>
      </QuestionCard>

      <OptionsContainer optionCount={question.options.length}>
        {question.options.map((option, index) => (
          <OptionBox
            key={index}
            selected={selectedOption === index}
            correct={option.correct}
            showResult={showResult}
            disabled={showResult}
            onClick={() => handleOptionSelect(index)}
          >
            <CenteredText>{option.text}</CenteredText>
            {showResult && option.correct && <CheckCircle size={36} weight="fill" color={theme.success} />}
            {showResult && selectedOption === index && !option.correct && <XCircle size={36} weight="fill" color={theme.coral} />}
          </OptionBox>
        ))}
      </OptionsContainer>

      {showResult && question.explanation && (
        <InfoBox>
          <strong>Explanation:</strong> {question.explanation}
        </InfoBox>
      )}

      <ButtonGroup>
        {!showResult ? (
          <PrimaryButton
            primary
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
          >
            Submit Answer
          </PrimaryButton>
        ) : (
          <PrimaryButton primary onClick={handleNextQuestion}>
            {isLastQuestion ? 'View Results' : 'Next Question'}
            <ArrowRight size={18} weight="bold" />
          </PrimaryButton>
        )}
      </ButtonGroup>
    </Container>
  );
}

export default Quiz;
