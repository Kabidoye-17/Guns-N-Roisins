import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowsOut, Info, GameController } from '@phosphor-icons/react';
import { useState, useRef } from 'react';

const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #8d75e6 0%, #6956a8 50%, #4d3e78 100%);
  box-sizing: border-box;
  overflow: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px 20px;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #6956a8;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: #e8e8e8;
    transform: translateX(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
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

const GameIcon = styled.div`
  color: #6956a8;
`;

const Title = styled.h1`
  color: #2a2a2a;
  font-size: 24px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FullscreenButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #8d75e6 0%, #6956a8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(141, 117, 230, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
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

const GameContainer = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    min-height: 400px;
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 10;
  opacity: ${props => props.isLoading ? 1 : 0};
  pointer-events: ${props => props.isLoading ? 'all' : 'none'};
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    top: 15px;
    left: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8d75e6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #6956a8;
  font-size: 16px;
  font-weight: 600;
`;

const EmbedFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 2px solid rgba(141, 117, 230, 0.1);
  background: #ffffff;
  border-radius: 8px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const InfoPanel = styled.div`
  width: 320px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    width: 100%;
    max-height: 300px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  color: #6956a8;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionContent = styled.div`
  color: #4a4a4a;
  font-size: 14px;
  line-height: 1.6;
`;

const GameTag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #eadff8 0%, #d7c4fa 100%);
  color: #6956a8;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const InstructionList = styled.ul`
  margin: 0;
  padding-left: 20px;

  li {
    margin-bottom: 8px;
    color: #4a4a4a;
  }
`;

const CustomContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function EmbedPage({
  children,
  embedUrl,
  title = "Game",
  description = "Enjoy this interactive game!",
  difficulty = "Medium",
  category = "Puzzle",
  instructions = []
}) {
  const [isLoading, setIsLoading] = useState(true);
  const gameContainerRef = useRef(null);

  const handleFullscreen = () => {
    if (gameContainerRef.current) {
      if (gameContainerRef.current.requestFullscreen) {
        gameContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <FullScreenContainer>
      <TopBar>
        <BackButton to="/">
          <ArrowLeft size={18} weight="bold" />
          Back
        </BackButton>
        <TitleSection>
          <GameIcon>
            <GameController size={28} weight="duotone" />
          </GameIcon>
          <Title>{title}</Title>
        </TitleSection>
        <FullscreenButton onClick={handleFullscreen}>
          <ArrowsOut size={18} weight="bold" />
          Fullscreen
        </FullscreenButton>
      </TopBar>

      <MainContent>
        <GameContainer ref={gameContainerRef}>
          <LoadingOverlay isLoading={isLoading}>
            <Spinner />
            <LoadingText>Loading game...</LoadingText>
          </LoadingOverlay>
          {embedUrl ? (
            <EmbedFrame
              src={embedUrl}
              title={title}
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          ) : (
            <CustomContent>
              {children}
            </CustomContent>
          )}
        </GameContainer>

        <InfoPanel>
          <InfoSection>
            <SectionTitle>
              <Info size={20} weight="duotone" />
              About
            </SectionTitle>
            <SectionContent>{description}</SectionContent>
            <div>
              <GameTag>{category}</GameTag>
              <GameTag>{difficulty}</GameTag>
            </div>
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
