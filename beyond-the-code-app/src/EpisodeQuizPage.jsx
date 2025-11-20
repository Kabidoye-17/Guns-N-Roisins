import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowsOut, Info, CheckCircle, XCircle, ArrowRight } from '@phosphor-icons/react';
import episodes from './episodes.json';

const accentColors = {
  yellow: '#fff79e',
  pink: '#ffbaf7',
  green: '#C1FFBA',
  blue: '#BAEFF5',
  purple: '#8d75e6'
};

const theme = {
  primary: '#4a3a2a',
  gold: '#f5d247',
  coral: '#f47e3f',
  success: '#2dbf8c',
  textMedium: '#666',
  border: '#ddd',
  white: '#fff',
  backgroundLavender: '#f8f5ff'
};

// Layout Components
const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #a990f5;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 60px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px,
        transparent 60px
      );
    pointer-events: none;
    z-index: 0;
  }
`;

const Pentagon = styled.div`
  position: absolute;
  width: ${props => props.size || '150px'};
  height: ${props => props.size || '150px'};
  background: ${props => props.color};
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  opacity: 0.12;
  pointer-events: none;
  z-index: 1;
  ${props => props.position}

  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '90px'};
    height: ${props => props.mobileSize || '90px'};
  }
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size || '135px'};
  height: ${props => props.size || '135px'};
  background: ${props => props.color};
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
  ${props => props.position}

  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '75px'};
    height: ${props => props.mobileSize || '75px'};
  }
`;

const ElongatedRect = styled.div`
  position: absolute;
  width: ${props => props.width || '225px'};
  height: ${props => props.height || '90px'};
  background: ${props => props.color};
  border-radius: 45px;
  opacity: 0.08;
  pointer-events: none;
  z-index: 1;
  transform: ${props => props.rotate || 'rotate(25deg)'};
  ${props => props.position}

  @media (max-width: 768px) {
    width: ${props => props.mobileWidth || '135px'};
    height: ${props => props.mobileHeight || '52px'};
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid ${props => props.accentColor};
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 12px 15px;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const BackButton = styled(Link)`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: ${props => props.accentColor};
  color: #4a3a2a;
  text-decoration: none;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  transition: all 0.2s ease;
  box-shadow: 0 3px 9px ${props => `${props.accentColor}40`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 12px ${props => `${props.accentColor}60`};
  }

  @media (max-width: 768px) {
    padding: 6px 11px;
    font-size: 11px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  @media (max-width: 768px) {
    flex: 1 0 100%;
    order: -1;
  }
`;

const Title = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  color: white;
  font-size: 21px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FullscreenButton = styled.button`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid ${props => props.accentColor};
  border-radius: 7px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 6px 11px;
    font-size: 11px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  gap: 15px;
  padding: 15px 30px 30px;
  overflow: hidden;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 11px 15px 15px;
  }
`;

const GameContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  border: 2px solid ${props => props.accentColor};
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    min-height: 300px;
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const InfoPanel = styled.div`
  width: 240px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 2px solid ${props => `${props.accentColor}60`};
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  padding: 21px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 21px;

  @media (max-width: 1024px) {
    width: 100%;
    max-height: 225px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  color: ${props => props.accentColor};
  font-size: 10px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  svg {
    color: ${props => props.accentColor};
  }
`;

const SectionContent = styled.div`
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.95);
  font-size: 11px;
  line-height: 1.6;
`;

const InstructionList = styled.ul`
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding-left: 15px;

  li {
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.6;
    font-size: 11px;

    &::marker {
      color: ${props => props.accentColor};
    }
  }
`;

// Quiz Components
const QuizContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 1px solid ${theme.border};
  background: ${theme.white};
  padding: 24px 32px;
  border-radius: 11px;

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const Label = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.textMedium};
  margin-bottom: 12px;
`;

const QuestionHeading = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  white-space: pre-line;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  color: ${theme.primary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const OptionBox = styled.button`
  font-family: 'Inter', sans-serif;
  min-height: 75px;
  padding: 15px;
  border-radius: 9px;
  border: 2px solid;
  background: ${props =>
    props.selected && !props.showResult ? `${props.accentColor}20` :
    props.showResult && props.correct ? 'rgba(45, 191, 140, 0.08)' :
    props.showResult && props.selected && !props.correct ? 'rgba(244, 126, 63, 0.08)' :
    theme.white
  };
  border-color: ${props =>
    props.selected && !props.showResult ? props.accentColor :
    props.showResult && props.correct ? theme.success :
    props.showResult && props.selected && !props.correct ? theme.coral :
    theme.border
  };
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.primary};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    min-height: 60px;
    padding: 12px;
    font-size: 11px;
  }
`;

const InfoBox = styled.div`
  font-family: 'Inter', sans-serif;
  padding: 15px;
  border-radius: 9px;
  background: ${theme.backgroundLavender};
  border-left: 3px solid ${theme.gold};
  font-size: 12px;
  line-height: 1.6;
  color: ${theme.primary};

  strong {
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const PrimaryButton = styled.button`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 24px;
  background: ${props => props.primary ? theme.primary : 'transparent'};
  color: ${props => props.primary ? theme.white : theme.primary};
  border: 2px solid ${theme.primary};
  border-radius: 7px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 11px;
  }
`;

const ScoreCard = styled.div`
  text-align: center;
  border: 1px solid ${theme.border};
  padding: 48px 32px;
  border-radius: 11px;
  background: ${theme.white};

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const ScoreValue = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: ${props => props.percentage >= 70 ? theme.success : props.percentage >= 50 ? theme.gold : theme.coral};
  margin: 18px 0;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const ScoreMessage = styled.p`
  color: ${theme.textMedium};
  font-size: 12px;
  line-height: 1.6;
  margin: 12px 0 24px 0;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ScoreBreakdown = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 18px 0;
  padding: 15px;
  background: ${theme.backgroundLavender};
  border-radius: 7px;

  @media (max-width: 768px) {
    gap: 15px;
    flex-direction: column;
  }
`;

const StatDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${theme.textMedium};
  font-weight: 700;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.color || theme.primary};
`;

function EpisodeQuizPage() {
  const { episodeId } = useParams();
  const episodeIndex = parseInt(episodeId) - 1;
  const episode = episodes[episodeIndex];
  const containerRef = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!episode) {
    return <div>Episode not found</div>;
  }

  const accentColor = accentColors[episode.colorTheme] || accentColors.yellow;

  // Transform episode data into quiz format
  let quizTitle = episode.title;
  let description = 'Complete this interactive quiz';
  let instructions = [
    "Read each question carefully",
    "Select the answer you think is correct",
    "Click 'Submit Answer' to check your response",
    "Review the explanation to learn more",
    "Click 'Next Question' to continue"
  ];
  let questions = [];

  if (episode.gameContent && episode.gameContent.type === 'ethical-dilemmas') {
    description = episode.gameContent.about || 'Test your ethical decision-making with real-world scenarios';
    instructions = episode.gameContent.howToPlay?.steps || instructions;
    questions = episode.gameContent.scenarios.map(scenario => ({
      id: scenario.id,
      question: `${scenario.title}\n\n${scenario.description}`,
      options: scenario.options.map(option => ({
        text: option.text,
        correct: option.correct === true,
        feedback: option.feedback
      }))
    }));
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

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

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    }
  };

  // Render quiz complete screen
  if (quizComplete) {
    const score = answers.filter(a => a.correct).length;
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <FullScreenContainer ref={containerRef}>
        <Pentagon color={accentColor} size="200px" mobileSize="120px" position="top: 100px; right: 8%;" />
        <Star color={accentColor} size="160px" mobileSize="90px" position="top: 350px; left: 5%;" />
        <ElongatedRect color={accentColor} width="320px" height="140px" mobileWidth="190px" mobileHeight="80px" rotate="rotate(35deg)" position="bottom: 150px; right: -50px;" />
        <Pentagon color={accentColor} size="180px" mobileSize="100px" position="bottom: 80px; left: 10%;" />
        <Star color={accentColor} size="140px" mobileSize="80px" position="top: 200px; right: 15%;" />

        <TopBar accentColor={accentColor}>
          <BackButton to={`/episode/${episodeId}`} accentColor={accentColor}>
            <ArrowLeft size={18} weight="bold" />
            Back
          </BackButton>
          <TitleSection>
            <Title>{quizTitle}</Title>
          </TitleSection>
          <FullscreenButton onClick={handleFullscreen} accentColor={accentColor}>
            <ArrowsOut size={18} weight="bold" />
            Fullscreen
          </FullscreenButton>
        </TopBar>

        <MainContent>
          <GameContainer accentColor={accentColor}>
            <QuizContainer>
              <ScoreCard>
                <QuestionHeading style={{ marginBottom: '16px', fontSize: '24px' }}>Quiz Complete!</QuestionHeading>
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
            </QuizContainer>
          </GameContainer>

          <InfoPanel accentColor={accentColor}>
            <InfoSection>
              <SectionTitle accentColor={accentColor}>
                <Info size={20} weight="duotone" />
                About
              </SectionTitle>
              <SectionContent>{description}</SectionContent>
            </InfoSection>

            {instructions.length > 0 && (
              <InfoSection>
                <SectionTitle accentColor={accentColor}>How to Play</SectionTitle>
                <InstructionList accentColor={accentColor}>
                  {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </InstructionList>
              </InfoSection>
            )}
          </InfoPanel>
        </MainContent>
      </FullScreenContainer>
    );
  }

  // Render quiz question
  return (
    <FullScreenContainer ref={containerRef}>
      <Pentagon color={accentColor} size="200px" mobileSize="120px" position="top: 100px; right: 8%;" />
      <Star color={accentColor} size="160px" mobileSize="90px" position="top: 350px; left: 5%;" />
      <ElongatedRect color={accentColor} width="320px" height="140px" mobileWidth="190px" mobileHeight="80px" rotate="rotate(35deg)" position="bottom: 150px; right: -50px;" />
      <Pentagon color={accentColor} size="180px" mobileSize="100px" position="bottom: 80px; left: 10%;" />
      <Star color={accentColor} size="140px" mobileSize="80px" position="top: 200px; right: 15%;" />

      <TopBar accentColor={accentColor}>
        <BackButton to={`/episode/${episodeId}`} accentColor={accentColor}>
          <ArrowLeft size={18} weight="bold" />
          Back
        </BackButton>
        <TitleSection>
          <Title>{quizTitle}</Title>
        </TitleSection>
        <FullscreenButton onClick={handleFullscreen} accentColor={accentColor}>
          <ArrowsOut size={18} weight="bold" />
          Fullscreen
        </FullscreenButton>
      </TopBar>

      <MainContent>
        <GameContainer accentColor={accentColor}>
          <QuizContainer>
            <QuestionCard>
              <Label>
                Question {currentQuestion + 1} of {questions.length}
              </Label>
              <QuestionHeading>{question.question}</QuestionHeading>
            </QuestionCard>

            <OptionsContainer>
              {question.options.map((option, index) => (
                <OptionBox
                  key={index}
                  selected={selectedOption === index}
                  correct={option.correct}
                  showResult={showResult}
                  disabled={showResult}
                  onClick={() => handleOptionSelect(index)}
                  accentColor={accentColor}
                >
                  {option.text}
                  {showResult && option.correct && <CheckCircle size={36} weight="fill" color={theme.success} />}
                  {showResult && selectedOption === index && !option.correct && <XCircle size={36} weight="fill" color={theme.coral} />}
                </OptionBox>
              ))}
            </OptionsContainer>

            {showResult && selectedOption !== null && question.options[selectedOption].feedback && (
              <InfoBox>
                <strong>Your choice:</strong> {question.options[selectedOption].feedback}
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
          </QuizContainer>
        </GameContainer>

        <InfoPanel accentColor={accentColor}>
          <InfoSection>
            <SectionTitle accentColor={accentColor}>
              <Info size={20} weight="duotone" />
              About
            </SectionTitle>
            <SectionContent>{description}</SectionContent>
          </InfoSection>

          {instructions.length > 0 && (
            <InfoSection>
              <SectionTitle accentColor={accentColor}>How to Play</SectionTitle>
              <InstructionList accentColor={accentColor}>
                {instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </InstructionList>
            </InfoSection>
          )}
        </InfoPanel>
      </MainContent>
    </FullScreenContainer>
  );
}

export default EpisodeQuizPage;
