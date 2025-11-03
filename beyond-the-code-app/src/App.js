import styled from 'styled-components';
import EpisodeCard from './EpisodeCard';
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

function App() {
  return (
    <>
      <Page bgColor="#f0f0f0">
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

export default App;
