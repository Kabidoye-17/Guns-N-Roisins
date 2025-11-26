import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Headphones } from '@phosphor-icons/react';

const Card = styled.div`
  width: 280px;
  height: 450px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  border-top: 3px solid ${props => props.accentColor || '#8d75e6'};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
    border-color: #d0d0d0;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 225px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.accentColor || '#8d75e6'};
  font-size: 11px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 18px;
  padding-bottom: 52px;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 9px;
  gap: 9px;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
  line-height: 1.3;
  letter-spacing: -0.01em;
  flex: 1;
`;

const Duration = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: white;
  background: ${props => props.accentColor || '#8d75e6'};
  padding: 4px 9px;
  border-radius: 5px;
  white-space: nowrap;
`;

const Info = styled.p`
  font-size: 11px;
  margin: 5px 0;
  color: #666;
  font-weight: 500;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const Description = styled.p`
  font-size: 11px;
  color: #888;
  margin: 9px 0 0 0;
  font-style: italic;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const PlayButton = styled(Link)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.accentColor || '#8d75e6'};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`;

const accentColors = {
  purple: '#8d75e6',
  yellow: '#fff79e',
  pink: '#ffbaf7',
  green: '#C1FFBA',
  blue: '#BAEFF5',
  gold: '#010000ff',
  teal: '#2dbf8c',
  coral: '#f47e3f',
  mint: '#98D8C8'
};

function EpisodeCard({ image, title, duration, host, guest, description, episodeId, colorTheme = 'pink' }) {
  const accentColor = accentColors[colorTheme] || accentColors.pink;

  return (
    <Card accentColor={accentColor}>
      {image ? (
        <Image src={process.env.PUBLIC_URL + image} alt={title} />
      ) : (
        <ImagePlaceholder accentColor={accentColor}>
          <Headphones size={48} weight="duotone" />
        </ImagePlaceholder>
      )}
      <Content>
        <TitleRow>
          <Title>{title}</Title>
          <Duration accentColor={accentColor}>
            {duration}
          </Duration>
        </TitleRow>
        <Info><strong>Host:</strong> {host}</Info>
        <Info><strong>{"Guest(s)"}:</strong> {guest}</Info>
        <Description>"{description}"</Description>
        <PlayButton to={`/episode/${episodeId}`} accentColor={accentColor}>
          <Headphones size={24} weight="fill" />
        </PlayButton>
      </Content>
    </Card>
  );
}

export default EpisodeCard;
