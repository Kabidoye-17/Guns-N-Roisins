import { useParams, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Play, Pause, ArrowLeft, GameController, ArrowRight } from '@phosphor-icons/react';
import Header from './Header';
import Footer from './Footer';
import episodes from './episodes.json';

const accentColors = {
  purple: '#7c3aed',
  violet: '#9333ea',
  magenta: '#a855f7'
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
        rgba(0, 0, 0, 0.02) 0px,
        rgba(0, 0, 0, 0.02) 1px,
        transparent 1px,
        transparent 60px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.02) 0px,
        rgba(0, 0, 0, 0.02) 1px,
        transparent 1px,
        transparent 60px
      );
    pointer-events: none;
    z-index: 0;
  }
`;

const HeroBanner = styled.div`
  width: 100%;
  padding: 60px 40px 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 40px 24px 30px;
  }
`;

const EpisodeTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-align: center;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const EpisodeImage = styled.img`
  width: 100%;
  max-width: 1200px;
  height: 400px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    height: 300px;
    border-radius: 12px;
  }
`;

const ContentWrapper = styled.div`
  background: linear-gradient(180deg, transparent 0%, #ffffff 10%, #f8f9fa 70%, #e9ecef 100%);
  position: relative;
  z-index: 2;
  margin-top: -40px;
  border-radius: 32px 32px 0 0;
  padding-top: 60px;

  @media (max-width: 768px) {
    border-radius: 24px 24px 0 0;
    padding-top: 40px;
    margin-top: -30px;
  }
`;

const AudioPlayerSection = styled.div`
  padding: 0 40px 40px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 24px 24px;
  }
`;

const PlayerTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.accentColor || '#1a1a1a'};
  margin: 0 0 24px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CustomAudioPlayer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

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
  background: ${props => props.accentColor || '#98D8C8'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 12px ${props => props.accentColor ? `${props.accentColor}40` : 'rgba(152, 216, 200, 0.4)'};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${props => props.accentColor ? `${props.accentColor}60` : 'rgba(152, 216, 200, 0.6)'};
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
  background: #ddd;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.accentColor || '#98D8C8'};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.accentColor || '#98D8C8'};
    cursor: pointer;
    border: none;

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
  color: #666;
  font-weight: 500;
`;

const HiddenAudio = styled.audio`
  display: none;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`;

const Circle1 = styled(DecorativeCircle)`
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, ${props => props.color}20 0%, ${props => props.color}00 70%);
  top: 200px;
  right: -100px;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    right: -80px;
  }
`;

const Circle2 = styled(DecorativeCircle)`
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, ${props => props.color}15 0%, ${props => props.color}00 70%);
  top: 600px;
  left: -80px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    left: -60px;
  }
`;

const Circle3 = styled(DecorativeCircle)`
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, ${props => props.color}18 0%, ${props => props.color}00 70%);
  bottom: 200px;
  right: -120px;

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const DescriptionSection = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const QuoteBlock = styled.blockquote`
  background: white;
  border-left: 6px solid ${props => props.accentColor || '#98D8C8'};
  border-radius: 16px;
  padding: 40px;
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-style: italic;
  color: #2c3e50;
  line-height: 1.8;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 32px;
    font-size: 18px;
  }
`;

const InfoSection = styled.div`
  padding: 40px 40px 80px 40px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 24px 24px 60px 24px;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.accentColor || '#1a1a1a'};
  margin: 0 0 24px 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const InfoItem = styled.div`
  background: white;
  padding: 24px 28px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: ${props => props.accentColor || '#666'};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  span {
    font-size: 16px;
    color: #2c3e50;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 20px 24px;

    span {
      font-size: 15px;
    }
  }
`;

const QuizCTASection = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto 40px auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 24px;
    margin: 0 auto 24px auto;
  }
`;

const QuizCTACard = styled.div`
  background: linear-gradient(135deg, ${props => props.accentColor}15 0%, ${props => props.accentColor}08 100%);
  border: 2px solid ${props => props.accentColor};
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, ${props => props.accentColor}20 0%, transparent 70%);
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 36px 24px;
  }
`;

const QuizIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${props => props.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 8px 24px ${props => props.accentColor}40;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const QuizHeading = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const QuizDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const QuizButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: ${props => props.accentColor};
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${props => props.accentColor}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${props => props.accentColor}60;
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
  gap: 12px;
`;

const ReferenceItem = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2c3e50;
  line-height: 1.6;
  position: relative;
  padding-left: 32px;

  &::before {
    content: '${props => props.number}.';
    position: absolute;
    left: 0;
    font-weight: 600;
    color: ${props => props.accentColor};
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding-left: 28px;

    &::before {
      font-size: 15px;
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

  if (!episode) {
    return (
      <PageContainer>
        <Header />
        <HeroBanner>
          <EpisodeTitle>Episode Not Found</EpisodeTitle>
        </HeroBanner>
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
      <Circle1 color={accentColor} />
      <Circle2 color={accentColor} />
      <Circle3 color={accentColor} />

      <HeroBanner>
        <EpisodeTitle>{episode.title}</EpisodeTitle>
      </HeroBanner>

      <EpisodeImage
        src={process.env.PUBLIC_URL + '/podcast.jpg'}
        alt={episode.title}
      />

      <ContentWrapper>
        <AudioPlayerSection>
        <PlayerTitle accentColor={accentColor}>Listen Now</PlayerTitle>
        <CustomAudioPlayer>
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
          >
            <source src="" type="audio/mpeg" />
            Your browser does not support the audio element.
          </HiddenAudio>
        </CustomAudioPlayer>
      </AudioPlayerSection>

      <DescriptionSection>
        <QuoteBlock accentColor={accentColor}>
          {episode.description}
        </QuoteBlock>
      </DescriptionSection>

      <InfoSection>
        <SectionTitle accentColor={accentColor}>Episode Credits</SectionTitle>
        <InfoGrid>
          <InfoItem accentColor={accentColor}>
            <strong>Host</strong>
            <span>{episode.host}</span>
          </InfoItem>
          <InfoItem accentColor={accentColor}>
            <strong>Guest</strong>
            <span>{episode.guest}</span>
          </InfoItem>
          <InfoItem accentColor={accentColor}>
            <strong>Production Credits</strong>
            <span>{episode.credits}</span>
          </InfoItem>
        </InfoGrid>
      </InfoSection>

      <QuizCTASection>
        <QuizCTACard accentColor={accentColor}>
          <QuizIcon accentColor={accentColor}>
            <GameController size={36} weight="bold" color="white" />
          </QuizIcon>
          <QuizHeading>Want to test your knowledge?</QuizHeading>
          <QuizDescription>
            Challenge yourself with our interactive quiz! Test what you've learned from this episode and see how well you understand the key concepts.
          </QuizDescription>
          <QuizButton to="/quiz/episode1" accentColor={accentColor}>
            Try the Quiz
            <ArrowRight size={20} weight="bold" />
          </QuizButton>
        </QuizCTACard>
      </QuizCTASection>

      {episode.references && episode.references.length > 0 && (
        <InfoSection>
          <SectionTitle accentColor={accentColor}>References</SectionTitle>
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
        </InfoSection>
      )}
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}

export default EpisodeDetailPage;
