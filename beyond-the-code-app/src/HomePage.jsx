import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, PuzzlePiece, Brain, Headphones } from '@phosphor-icons/react';
import Carousel from './Carousel';
import Header from './Header';
import Footer from './Footer';
import episodes from './episodes.json';

// Hero Page Styles
const HeroPage = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #a990f5;
  padding: 120px 40px 80px;
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

  @media (max-width: 768px) {
    padding: 100px 24px 60px;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  text-align: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 80px;
  font-weight: 700;
  color: white;
  margin: 0 0 32px 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 968px) {
    font-size: 64px;
  }

  @media (max-width: 768px) {
    font-size: 48px;
    margin: 0 0 24px 0;
  }
`;

const HeroTagline = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 24px 0;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const HeroDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin: 0 auto 48px;
  max-width: 680px;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 36px;
  }
`;

const HeroButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const HeroPrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: #F0A848;
  color: #4a3a2a;
  text-decoration: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(240, 168, 72, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(240, 168, 72, 0.6);
    background: #ffb85c;
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 16px;
  }
`;

const HeroSecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: rgba(255, 247, 158, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  border: 3px solid #fff79e;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(255, 247, 158, 0.3);

  &:hover {
    background: rgba(255, 247, 158, 0.35);
    border-color: #fff79e;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 0 40px rgba(255, 247, 158, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 16px;
  }
`;

const HeroCircle1 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 247, 158, 0.45);
  box-shadow: 0 0 60px rgba(255, 247, 158, 0.3);
  top: -100px;
  right: 10%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const HeroCircle2 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 135, 241, 0.35);
  box-shadow: 0 0 50px rgba(255, 135, 241, 0.2);
  bottom: 15%;
  left: 8%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const HeroSquare1 = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(172, 232, 165, 0.4);
  box-shadow: 0 0 50px rgba(172, 232, 165, 0.25);
  top: 20%;
  left: 5%;
  pointer-events: none;
  z-index: 1;
  transform: rotate(15deg);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const HeroSquare2 = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 20px;
  background: rgba(255, 247, 158, 0.38);
  box-shadow: 0 0 45px rgba(255, 247, 158, 0.25);
  bottom: 20%;
  right: 15%;
  pointer-events: none;
  z-index: 1;
  transform: rotate(-10deg);

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const HeroTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 260px solid rgba(157, 234, 242, 0.35);
  filter: drop-shadow(0 0 40px rgba(157, 234, 242, 0.25));
  top: 50%;
  right: 5%;
  pointer-events: none;
  z-index: 1;
  transform: rotate(30deg);

  @media (max-width: 768px) {
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 173px solid rgba(157, 234, 242, 0.35);
  }
`;

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #a990f5;
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
  width: 250px;
  height: 250px;
  top: 10%;
  left: 5%;
  background: rgba(172, 232, 165, 0.4);
  box-shadow: 0 0 50px rgba(172, 232, 165, 0.25);
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const Circle2 = styled(DecorativeCircle)`
  width: 180px;
  height: 180px;
  top: 60%;
  right: 8%;
  background: rgba(255, 247, 158, 0.42);
  box-shadow: 0 0 50px rgba(255, 247, 158, 0.3);
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Square1 = styled(DecorativeCircle)`
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: 10%;
  background: rgba(255, 135, 241, 0.35);
  box-shadow: 0 0 50px rgba(255, 135, 241, 0.2);
  transform: rotate(20deg);

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Square2 = styled(DecorativeCircle)`
  width: 150px;
  height: 150px;
  top: 25%;
  right: 15%;
  background: rgba(172, 232, 165, 0.38);
  box-shadow: 0 0 45px rgba(172, 232, 165, 0.25);
  border-radius: 15px;
  transform: rotate(-15deg);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
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
  background: linear-gradient(90deg, #fff79e 0%, #C1FFBA 25%, #BAEFF5 50%, #ffbaf7 75%, #a990f5 100%);
  border-radius: 3px;
  margin: 0 auto 32px;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 15px rgba(255, 247, 158, 0.3);
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

const IconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.bgColor || 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.6;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
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
      <Header />
      <HeroPage>
        <HeroCircle1 />
        <HeroCircle2 />
        <HeroSquare1 />
        <HeroSquare2 />
        <HeroTriangle />
        <HeroContent>
          <HeroTitle>Beyond the Code</HeroTitle>
          <HeroTagline>Where Technology Meets Innovation</HeroTagline>
          <HeroDescription>
            Join us as we explore the stories behind the world's most innovative tech leaders,
            diving deep into their journeys, challenges, and the future they're building.
          </HeroDescription>
          <HeroButtonGroup>
            <HeroSecondaryButton onClick={scrollToEpisodes}>
              Browse Episodes
              <ArrowDown size={22} weight="bold" />
            </HeroSecondaryButton>
          </HeroButtonGroup>
        </HeroContent>
      </HeroPage>
      <Page id="episodes-section">
        <Circle1 />
        <Circle2 />
        <Square1 />
        <Square2 />
        <ContentWrapper>
          <SectionHeading>Hear From The Experts</SectionHeading>
          <Carousel episodes={episodes} />
        </ContentWrapper>
      </Page>
      <Footer />
    </>
  );
}

export default HomePage;
