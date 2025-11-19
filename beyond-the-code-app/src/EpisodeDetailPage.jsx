import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Play, Pause, ArrowLeft, GameController, ArrowRight } from '@phosphor-icons/react';
import Header from './Header';
import Footer from './Footer';
import episodes from './episodes.json';

const accentColors = {
  yellow: '#fff79e',
  pink: '#ffbaf7',
  green: '#C1FFBA',
  blue: '#BAEFF5',
  purple: '#8d75e6'
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #a990f5;
  padding-top: 70px;
  position: relative;
  overflow: hidden;

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

// Hexagon shape
const Hexagon = styled.div`
  position: absolute;
  width: ${props => props.size || '200px'};
  height: ${props => props.size ? `calc(${props.size} * 0.866)` : '173px'};
  background: ${props => props.color};
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
  ${props => props.position}

  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '120px'};
    height: ${props => props.mobileSize ? `calc(${props.mobileSize} * 0.866)` : '104px'};
  }
`;

// Diamond shape
const Diamond = styled.div`
  position: absolute;
  width: ${props => props.size || '180px'};
  height: ${props => props.size || '180px'};
  background: ${props => props.color};
  transform: rotate(45deg);
  opacity: 0.12;
  pointer-events: none;
  z-index: 1;
  border-radius: 20px;
  ${props => props.position}

  @media (max-width: 768px) {
    width: ${props => props.mobileSize || '100px'};
    height: ${props => props.mobileSize || '100px'};
  }
`;

// Parallelogram shape
const Parallelogram = styled.div`
  position: absolute;
  width: ${props => props.width || '240px'};
  height: ${props => props.height || '160px'};
  background: ${props => props.color};
  transform: skew(-20deg);
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
  border-radius: 16px;
  ${props => props.position}

  @media (max-width: 768px) {
    width: ${props => props.mobileWidth || '140px'};
    height: ${props => props.mobileHeight || '90px'};
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 60px 40px 80px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 40px 24px 60px;
  }
`;

const EpisodeTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 56px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  text-align: center;
  line-height: 1.2;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const EpisodeMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;

  strong {
    color: ${props => props.accentColor || 'white'};
    font-weight: 700;
  }
`;

const EpisodeImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
  margin: 0 auto 48px;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 280px;
    margin-bottom: 36px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin: 48px 0 24px 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const AudioPlayerContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 48px;
  border: 2px solid ${props => props.accentColor}60;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PlayPauseButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.accentColor};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a3a2a;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 16px ${props => props.accentColor}60;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px ${props => props.accentColor}80;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProgressContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProgressBar = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${props => props.accentColor};
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${props => props.accentColor};
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
`;

const HiddenAudio = styled.audio`
  display: none;
`;

const QuoteBlock = styled.blockquote`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-style: italic;
  color: white;
  line-height: 1.8;
  margin: 0 0 48px 0;
  padding-left: 32px;
  border-left: 6px solid ${props => props.accentColor};
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 20px;
    padding-left: 24px;
    border-left-width: 4px;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 48px;
`;

const InfoItem = styled.div`
  font-family: 'Inter', sans-serif;

  strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: ${props => props.accentColor};
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 8px;
  }

  span {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    span {
      font-size: 16px;
    }
  }
`;

const QuizSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  border: 3px solid ${props => props.accentColor};
  margin: 48px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 36px 24px;
  }
`;

const QuizIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 8px 24px ${props => props.accentColor}60;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`;

const QuizHeading = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const QuizDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0 0 32px 0;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const QuizButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 36px;
  background: ${props => props.accentColor};
  color: #4a3a2a;
  text-decoration: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${props => props.accentColor}60;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${props => props.accentColor}80;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 16px;
  }
`;

const ReferencesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReferenceItem = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.7;
  position: relative;
  padding-left: 36px;

  &::before {
    content: '${props => props.number}.';
    position: absolute;
    left: 0;
    font-weight: 700;
    color: ${props => props.accentColor};
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding-left: 32px;

    &::before {
      font-size: 16px;
    }
  }
`;

function EpisodeDetailPage() {
  const { episodeId } = useParams();
  const episodeIndex = parseInt(episodeId) - 1;
  const episode = episodes[episodeIndex];

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [episodeId]);

  if (!episode) {
    return (
      <PageContainer>
        <Header />
        <ContentContainer>
          <EpisodeTitle>Episode Not Found</EpisodeTitle>
        </ContentContainer>
      </PageContainer>
    );
  }

  const accentColor = accentColors[episode.colorTheme] || accentColors.purple;

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PageContainer>
      <Header />

      {/* Geometric Shapes */}
      <Hexagon
        color={accentColor}
        size="220px"
        mobileSize="130px"
        position="top: 150px; right: 5%;"
      />
      <Diamond
        color={accentColor}
        size="200px"
        mobileSize="110px"
        position="top: 450px; left: -50px;"
      />
      <Parallelogram
        color={accentColor}
        width="280px"
        height="180px"
        mobileWidth="160px"
        mobileHeight="100px"
        position="top: 800px; right: -60px;"
      />
      <Hexagon
        color={accentColor}
        size="180px"
        mobileSize="100px"
        position="top: 1200px; left: 8%;"
      />
      <Diamond
        color={accentColor}
        size="160px"
        mobileSize="90px"
        position="bottom: 400px; right: 10%;"
      />
      <Parallelogram
        color={accentColor}
        width="240px"
        height="150px"
        mobileWidth="140px"
        mobileHeight="80px"
        position="bottom: 100px; left: 5%;"
      />

      <ContentContainer>
        <EpisodeTitle>{episode.title}</EpisodeTitle>

        <EpisodeImage
          src={process.env.PUBLIC_URL + '/podcast.jpg'}
          alt={episode.title}
        />

        <SectionTitle>Listen Now</SectionTitle>
        <AudioPlayerContainer accentColor={accentColor}>
          <PlayerControls>
            <PlayPauseButton onClick={togglePlayPause} accentColor={accentColor}>
              {isPlaying ? (
                <Pause size={28} weight="fill" />
              ) : (
                <Play size={28} weight="fill" />
              )}
            </PlayPauseButton>

            <ProgressContainer>
              <ProgressBar
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                accentColor={accentColor}
              />
              <TimeDisplay>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </TimeDisplay>
            </ProgressContainer>
          </PlayerControls>

          <HiddenAudio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
            src={process.env.PUBLIC_URL + '/Dennis Reynolds - Two wars_!.mp3'}
          >
            Your browser does not support the audio element.
          </HiddenAudio>
        </AudioPlayerContainer>

        <QuoteBlock accentColor={accentColor}>
          {episode.description}
        </QuoteBlock>

        <SectionTitle>Episode Credits</SectionTitle>
        <InfoList>
          <InfoItem accentColor={accentColor}>
            <strong>Host</strong>
            <span>{episode.host}</span>
          </InfoItem>
          <InfoItem accentColor={accentColor}>
            <strong>{"Guest(s)"}</strong>
            <span>{episode.guest}</span>
          </InfoItem>
          <InfoItem accentColor={accentColor}>
            <strong>Production Credits</strong>
            <span>{episode.credits}</span>
          </InfoItem>
        </InfoList>

        <QuizSection accentColor={accentColor}>
          <QuizIcon accentColor={accentColor}>
            <GameController size={40} weight="bold" color="#4a3a2a" />
          </QuizIcon>
          <QuizHeading>Want to test your knowledge?</QuizHeading>
          <QuizDescription>
            Challenge yourself with our interactive quiz! Test what you've learned from this episode.
          </QuizDescription>
          <QuizButton to="/quiz/episode1" accentColor={accentColor}>
            Try the Quiz
            <ArrowRight size={20} weight="bold" />
          </QuizButton>
        </QuizSection>

        {episode.references && episode.references.length > 0 && (
          <>
            <SectionTitle>References</SectionTitle>
            <ReferencesList>
              {episode.references.map((reference, index) => (
                <ReferenceItem
                  key={index}
                  accentColor={accentColor}
                  number={index + 1}
                >
                  {reference}
                </ReferenceItem>
              ))}
            </ReferencesList>
          </>
        )}
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
}

export default EpisodeDetailPage;
