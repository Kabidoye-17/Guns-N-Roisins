import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowsOut, Info, GameController } from '@phosphor-icons/react';
import { useRef } from 'react';
import GamePanel from './GamePanel';

const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fef8f6;
  box-sizing: border-box;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: white;
  border-bottom: 3px solid #F0A848;
  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const BackButton = styled(Link)`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: #F0A848;
  color: white;
  text-decoration: none;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d89535;
    border-color: #d89535;
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 14px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex: 1 0 100%;
    order: -1;
  }
`;

const Title = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  color: #32274b;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FullscreenButton = styled.button`
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #8d75e6;
  color: white;
  border: 1px solid #8d75e6;
  border-radius: 9px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d89535;
    border-color: #d89535;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(240, 168, 72, 0.25);
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 14px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px 40px 40px;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 15px 20px 20px;
  }
`;

const InfoPanel = styled.div`
  width: 320px;
  background-color: white;
  border-radius: 11px;
  border: 2px solid #F0A848;
  box-shadow: 0 4px 12px rgba(240, 168, 72, 0.15);
  padding: 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 1024px) {
    width: 100%;
    max-height: 300px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  color: #8d75e6;
  font-size: 13px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  svg {
    color: #8d75e6;
  }
`;

const SectionContent = styled.div`
  font-family: 'Inter', sans-serif;
  color: #4d3e78;
  font-size: 15px;
  line-height: 1.6;
`;


const InstructionList = styled.ul`
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    color: #4d3e78;
    line-height: 1.6;
    font-size: 15px;

    &::marker {
      color: #F0A848;
    }
  }
`;

function EmbedPage({
  children,
  embedUrl,
  gameType,
  quizData,
  onQuizComplete,
  title = "Game",
  description = "Enjoy this interactive game!",
  instructions = []
}) {
  const gameContainerRef = useRef(null);

  const handleFullscreen = () => {
    if (gameContainerRef.current) {
      if (gameContainerRef.current.requestFullscreen) {
        gameContainerRef.current.requestFullscreen();
      }
    }
  };

  // Determine game type automatically if not specified
  const determinedGameType = gameType || (embedUrl ? 'embed' : 'custom');

  return (
    <FullScreenContainer>
      <TopBar>
        <BackButton to="/">
          <ArrowLeft size={18} weight="bold" />
          Back
        </BackButton>
        <TitleSection>
          <Title>{title}</Title>
        </TitleSection>
        <FullscreenButton onClick={handleFullscreen}>
          <ArrowsOut size={18} weight="bold" />
          Fullscreen
        </FullscreenButton>
      </TopBar>

      <MainContent>
        <GamePanel
          type={determinedGameType}
          embedUrl={embedUrl}
          quizData={quizData}
          onQuizComplete={onQuizComplete}
          title={title}
          containerRef={gameContainerRef}
        >
          {children}
        </GamePanel>

        <InfoPanel>
          <InfoSection>
            <SectionTitle>
              <Info size={20} weight="duotone" />
              About
            </SectionTitle>
            <SectionContent>{description}</SectionContent>
          </InfoSection>

          {instructions.length > 0 && (
            <InfoSection>
              <SectionTitle>How to Play</SectionTitle>
              <InstructionList>
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

export default EmbedPage;
