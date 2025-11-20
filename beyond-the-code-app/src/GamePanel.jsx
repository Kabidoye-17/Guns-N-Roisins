import styled from 'styled-components';
import { useState, useRef } from 'react';
import Quiz from './Quiz';

const GameContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  border: 2px solid ${props => props.accentColor || '#fff79e'};
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  width: calc(100% - 36px);
  height: calc(100% - 36px);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
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
    top: 12px;
    left: 12px;
    width: calc(100% - 24px);
    height: calc(100% - 24px);
  }
`;

const Spinner = styled.div`
  width: 33px;
  height: 33px;
  border: 2px solid rgba(169, 144, 245, 0.2);
  border-top: 2px solid ${props => props.accentColor || '#fff79e'};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #4a3a2a;
  font-size: 11px;
  font-weight: 600;
`;

const EmbedFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
  border-radius: 12px;
`;

const CustomContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * GamePanel - A reusable component for displaying different types of games
 *
 * @param {Object} props
 * @param {string} props.type - Type of game: 'embed' | 'custom' | 'canvas' | 'unity' | 'quiz'
 * @param {string} props.embedUrl - URL for embedded games (when type='embed')
 * @param {Object} props.quizData - Quiz data object (when type='quiz')
 * @param {function} props.onQuizComplete - Callback when quiz completes (score, total)
 * @param {React.ReactNode} props.children - Custom content for non-embedded games
 * @param {string} props.title - Game title for iframe title attribute
 * @param {boolean} props.showLoading - Whether to show loading state
 * @param {function} props.onLoad - Callback when game loads
 * @param {React.Ref} props.containerRef - Ref to the game container (for fullscreen, etc.)
 * @param {string} props.accentColor - Accent color for styling
 */
function GamePanel({
  type = 'custom',
  embedUrl,
  quizData,
  onQuizComplete,
  children,
  title = 'Game',
  showLoading = true,
  onLoad,
  containerRef,
  accentColor = '#fff79e'
}) {
  const [isLoading, setIsLoading] = useState(showLoading);
  const defaultContainerRef = useRef(null);
  const actualContainerRef = containerRef || defaultContainerRef;

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'embed':
        return embedUrl ? (
          <EmbedFrame
            src={embedUrl}
            title={title}
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        ) : null;

      case 'quiz':
        // For quiz, hide loading after initial render
        if (isLoading && showLoading) {
          setTimeout(() => setIsLoading(false), 100);
        }
        return quizData ? (
          <CustomContent>
            <Quiz quizData={quizData} onComplete={onQuizComplete} accentColor={accentColor} />
          </CustomContent>
        ) : null;

      case 'custom':
      case 'canvas':
      case 'unity':
      default:
        // For custom content, hide loading after initial render
        if (isLoading && showLoading) {
          setTimeout(() => setIsLoading(false), 100);
        }
        return <CustomContent>{children}</CustomContent>;
    }
  };

  return (
    <GameContainer ref={actualContainerRef} accentColor={accentColor}>
      <LoadingOverlay isLoading={isLoading}>
        <Spinner accentColor={accentColor} />
        <LoadingText>Loading game...</LoadingText>
      </LoadingOverlay>
      {renderContent()}
    </GameContainer>
  );
}

export default GamePanel;
