import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, PuzzlePiece, Brain } from '@phosphor-icons/react';
import Carousel from './Carousel';
import episodes from './episodes.json';

// Hero Page Styles
const HeroPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: linear-gradient(135deg, #1e3a8a 0%, #6366f1 30%, #8b5cf6 70%, #a990f5 100%);
  padding: 80px;
  gap: 60px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  &::after {
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
    z-index: 1;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 60px 40px;
    gap: 40px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 96px;
  font-weight: 400;
  color: white;
  margin: 0 0 24px 0;
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 56px;
  }
`;

const HeroTagline = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 20px 0;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const HeroDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: white;
  line-height: 1.7;
  margin: 0 0 40px 0;
  max-width: 580px;
  opacity: 0.85;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const HeroButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const HeroPrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
  }
`;

const HeroSecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 15px;
  }
`;

const HeroCircle1 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%);
  top: -150px;
  right: -50px;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -80px;
  }
`;

const HeroCircle2 = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0) 70%);
  bottom: -100px;
  right: 15%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    bottom: -80px;
    right: -20px;
  }
`;

const HeroCircle3 = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(96, 165, 250, 0) 70%);
  top: 20%;
  right: 25%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const HeroCircle4 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0) 70%);
  top: 50%;
  right: 5%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const HeroBlob = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  bottom: -100px;
  left: -100px;
  pointer-events: none;
  z-index: 1;
  transform: rotate(-15deg);

  @media (max-width: 768px) {
    width: 400px;
    height: 300px;
    bottom: -80px;
    left: -120px;
  }
`;

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || '#f0f0f0'};
  gap: 30px;
  flex-wrap: wrap;
  padding: 40px;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.06) 0px,
        rgba(255, 255, 255, 0.06) 1px,
        transparent 1px,
        transparent 60px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.06) 0px,
        rgba(255, 255, 255, 0.06) 1px,
        transparent 1px,
        transparent 60px
      );
    pointer-events: none;
    z-index: 1;
  }
`;

const LinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 60px;
  background: linear-gradient(135deg, #8d75e6 0%, #6956a8 100%);
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-size: 24px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(141, 117, 230, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 32px rgba(141, 117, 230, 0.5);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }

  @media (max-width: 768px) {
    padding: 30px 40px;
    font-size: 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ButtonText = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionHeading = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 64px;
  font-weight: 400;
  color: white;
  margin: 0 0 40px 0;
  text-align: center;
  letter-spacing: -0.01em;
  line-height: 1.2;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const DecorativeCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color || 'rgba(255, 255, 255, 0.1)'};
  pointer-events: none;
  z-index: 1;
`;

const Circle1 = styled(DecorativeCircle)`
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  background: rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const Circle2 = styled(DecorativeCircle)`
  width: 200px;
  height: 200px;
  top: 60%;
  right: 8%;
  background: rgba(141, 117, 230, 0.15);

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Circle3 = styled(DecorativeCircle)`
  width: 150px;
  height: 150px;
  bottom: 15%;
  left: 10%;
  background: rgba(45, 191, 140, 0.12);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Circle4 = styled(DecorativeCircle)`
  width: 120px;
  height: 120px;
  top: 25%;
  right: 15%;
  background: rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AccentBar = styled.div`
  width: 120px;
  height: 6px;
  background: linear-gradient(90deg, #F0A848 0%, #25A871 33%, #4E8FD0 66%, #EE86B7 100%);
  border-radius: 3px;
  margin: 0 auto 32px;
  position: relative;
  z-index: 2;
`;

const FeatureBadges = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Badge = styled.div`
  padding: 8px 20px;
  background: ${props => props.bgColor};
  color: white;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px ${props => props.shadowColor};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 6px 16px;
    font-size: 13px;
  }
`;

const HeroVisual = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 968px) {
    display: none;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateX(8px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const IconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px ${props => props.shadowColor || 'rgba(59, 130, 246, 0.3)'};
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
`;

function HomePage() {
  const scrollToEpisodes = () => {
    const episodesSection = document.getElementById('episodes-section');
    if (episodesSection) {
      episodesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HeroPage>
        <HeroCircle1 />
        <HeroCircle2 />
        <HeroCircle3 />
        <HeroCircle4 />
        <HeroBlob />
        <HeroContent>
          <HeroTitle>Beyond the Code</HeroTitle>
          <HeroTagline>Where Technology Meets Innovation</HeroTagline>
          <HeroDescription>
            Join us as we explore the stories behind the world's most innovative tech leaders,
            diving deep into their journeys, challenges, and the future they're building.
          </HeroDescription>
          <HeroButtonGroup>
            <HeroPrimaryButton to="/episodes">Listen Now</HeroPrimaryButton>
            <HeroSecondaryButton onClick={scrollToEpisodes}>
              Browse Episodes
              <ArrowDown size={20} weight="bold" />
            </HeroSecondaryButton>
          </HeroButtonGroup>
        </HeroContent>
        <HeroVisual>
          <FeatureCard>
            <IconCircle bgColor="linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)" shadowColor="rgba(59, 130, 246, 0.4)">
              <Brain size={28} weight="bold" color="white" />
            </IconCircle>
            <FeatureText>
              <FeatureTitle>Expert Insights</FeatureTitle>
              <FeatureDescription>Deep dives into tech leadership and innovation</FeatureDescription>
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <IconCircle bgColor="linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)" shadowColor="rgba(139, 92, 246, 0.4)">
              <PuzzlePiece size={28} weight="bold" color="white" />
            </IconCircle>
            <FeatureText>
              <FeatureTitle>Interactive Quizzes</FeatureTitle>
              <FeatureDescription>Test your knowledge with engaging challenges</FeatureDescription>
            </FeatureText>
          </FeatureCard>
          <FeatureCard>
            <IconCircle bgColor="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" shadowColor="rgba(99, 102, 241, 0.4)">
              <ArrowRight size={28} weight="bold" color="white" />
            </IconCircle>
            <FeatureText>
              <FeatureTitle>Latest Episodes</FeatureTitle>
              <FeatureDescription>Stay updated with cutting-edge tech stories</FeatureDescription>
            </FeatureText>
          </FeatureCard>
        </HeroVisual>
      </HeroPage>
      <Page id="episodes-section" bgColor="#a990f5">
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Circle4 />
        <ContentWrapper>
          <SectionHeading>Hear From The Experts</SectionHeading>
          <Carousel episodes={episodes} />
        </ContentWrapper>
      </Page>
    </>
  );
}

export default HomePage;
