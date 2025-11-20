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

// Pentagon shape
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

// Star shape
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

// Elongated rectangle
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
  border-bottom: 2px solid ${props => props.accentColor || '#fff79e'};
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
  background: ${props => props.accentColor || '#fff79e'};
  color: #4a3a2a;
  text-decoration: none;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  transition: all 0.2s ease;
  box-shadow: 0 3px 9px ${props => props.accentColor ? `${props.accentColor}40` : 'rgba(255, 247, 158, 0.4)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 12px ${props => props.accentColor ? `${props.accentColor}60` : 'rgba(255, 247, 158, 0.6)'};
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
  border: 2px solid ${props => props.accentColor || '#fff79e'};
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

const InfoPanel = styled.div`
  width: 240px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 2px solid ${props => props.accentColor ? `${props.accentColor}60` : 'rgba(255, 247, 158, 0.6)'};
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
  color: ${props => props.accentColor || '#fff79e'};
  font-size: 10px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  svg {
    color: ${props => props.accentColor || '#fff79e'};
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
      color: ${props => props.accentColor || '#fff79e'};
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
  instructions = [],
  accentColor = '#fff79e',
  backLink = '/'
}) {
  const gameContainerRef = useRef(null);

  const handleFullscreen = () => {
    if (gameContainerRef.current) {
      if (gameContainerRef.current.requestFullscreen) {
        gameContainerRef.current.requestFullscreen();
      }
    }
  };

  const determinedGameType = gameType || (embedUrl ? 'embed' : 'custom');

  return (
    <FullScreenContainer>
      {/* Geometric Shapes */}
      <Pentagon
        color={accentColor}
        size="200px"
        mobileSize="120px"
        position="top: 100px; right: 8%;"
      />
      <Star
        color={accentColor}
        size="160px"
        mobileSize="90px"
        position="top: 350px; left: 5%;"
      />
      <ElongatedRect
        color={accentColor}
        width="320px"
        height="140px"
        mobileWidth="190px"
        mobileHeight="80px"
        rotate="rotate(35deg)"
        position="bottom: 150px; right: -50px;"
      />
      <Pentagon
        color={accentColor}
        size="180px"
        mobileSize="100px"
        position="bottom: 80px; left: 10%;"
      />
      <Star
        color={accentColor}
        size="140px"
        mobileSize="80px"
        position="top: 200px; right: 15%;"
      />

      <TopBar accentColor={accentColor}>
        <BackButton to={backLink} accentColor={accentColor}>
          <ArrowLeft size={18} weight="bold" />
          Back
        </BackButton>
        <TitleSection>
          <Title>{title}</Title>
        </TitleSection>
        <FullscreenButton onClick={handleFullscreen} accentColor={accentColor}>
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
          accentColor={accentColor}
        >
          {children}
        </GamePanel>

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

export default EmbedPage;
