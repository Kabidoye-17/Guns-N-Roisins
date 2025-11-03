import styled from 'styled-components';
import { Headphones } from '@phosphor-icons/react';

const Card = styled.div`
  width: 300px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
  padding-bottom: 70px;
  position: relative;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Duration = styled.span`
  font-size: 18px;
  color: #666;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 8px 0;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 15px 0;
  font-style: italic;
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

function EpisodeCard({ image, title, duration, host, guest, description }) {
  return (
    <Card>
      {image ? (
        <Image src={image} alt={title} />
      ) : (
        <ImagePlaceholder>300x300</ImagePlaceholder>
      )}
      <Content>
        <TitleRow>
          <Title>{title}</Title>
          <Duration>{duration}</Duration>
        </TitleRow>
        <Info>Host: {host}</Info>
        <Info>Guest Speaker: {guest}</Info>
        <Description>"{description}"</Description>
        <PlayButton>
          <Headphones size={22} weight="bold" />
        </PlayButton>
      </Content>
    </Card>
  );
}

export default EpisodeCard;
