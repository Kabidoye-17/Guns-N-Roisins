import styled from 'styled-components';
import { useState, useRef } from 'react';
import Quiz from './Quiz';

const GameContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 11px;
  border: 1px solid rgba(77, 62, 120, 0.1);
  box-shadow: 0 1px 3px rgba(141, 117, 230, 0.08);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    min-height: 400px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: calc(100% - 48px);
  height: calc(100% - 48px);
  background: white;
  border-radius: 9px;
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
    top: 20px;
    left: 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
  }

  @media (max-width: 768px) {
    top: 16px;
    left: 16px;
    width: calc(100% - 32px);
    height: calc(100% - 32px);
  }
`;

const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border: 3px solid #f3ecf7;
  border-top: 3px solid #8d75e6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #4d3e78;
  font-size: 15px;
  font-weight: 600;
`;

const EmbedFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(77, 62, 120, 0.1);
  background: #ffffff;
  border-radius: 9px;
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
  containerRef
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
            <Quiz quizData={quizData} onComplete={onQuizComplete} />
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
    <GameContainer ref={actualContainerRef}>
      <LoadingOverlay isLoading={isLoading}>
        <Spinner />
        <LoadingText>Loading game...</LoadingText>
      </LoadingOverlay>
      {renderContent()}
    </GameContainer>
  );
}

export default GamePanel;