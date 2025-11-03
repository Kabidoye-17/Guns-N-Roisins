import { useState } from 'react';
import styled from 'styled-components';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import EpisodeCard from './EpisodeCard';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.currentIndex * 100}%);
`;

const CarouselItem = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: -60px;' : 'right: -60px;'}
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #ddd;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background-color: black;
    border-color: black;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 30px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? 'black' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.active ? 'black' : '#999'};
  }
`;

const CarouselWithDots = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Carousel({ episodes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < episodes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselWithDots>
      <CarouselContainer>
        <NavButton
          direction="left"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <CaretLeft size={24} weight="bold" />
        </NavButton>

        <CarouselWrapper>
          <CarouselContent currentIndex={currentIndex}>
            {episodes.map((episode, index) => (
              <CarouselItem key={index}>
                <EpisodeCard {...episode} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>

        <NavButton
          direction="right"
          onClick={goToNext}
          disabled={currentIndex === episodes.length - 1}
        >
          <CaretRight size={24} weight="bold" />
        </NavButton>
      </CarouselContainer>

      <DotsContainer>
        {episodes.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </CarouselWithDots>
  );
}

export default Carousel;
