import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, PuzzlePiece, Brain } from '@phosphor-icons/react';
import Carousel from './Carousel';
import episodes from './episodes.json';

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || '#f0f0f0'};
  gap: 30px;
  flex-wrap: wrap;
  padding: 40px;
  box-sizing: border-box;
  overflow-x: hidden;
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

function HomePage() {
  return (
    <>
      <Page bgColor="#f0f0f0">
        <LinkCard to="/embed">
          <IconWrapper>
            <PuzzlePiece size={48} weight="duotone" />
          </IconWrapper>
          <ButtonText>
            ISE 222 Crossword
            <ArrowRight size={24} weight="bold" />
          </ButtonText>
        </LinkCard>
        <LinkCard to="/quiz/episode1">
          <IconWrapper>
            <Brain size={48} weight="duotone" />
          </IconWrapper>
          <ButtonText>
            JavaScript Quiz
            <ArrowRight size={24} weight="bold" />
          </ButtonText>
        </LinkCard>
      </Page>
      <Page bgColor="#e0e0e0">
        <Carousel episodes={episodes} />
      </Page>
      <Page bgColor="#d0d0d0">
        <h1>Page 3</h1>
      </Page>
    </>
  );
}

export default HomePage;
