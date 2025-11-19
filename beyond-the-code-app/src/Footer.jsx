import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #ddd6fe 100%);
  padding: 20px 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Copyright>© {currentYear} Beyond the Code. All rights reserved.</Copyright>
    </FooterContainer>
  );
}

export default Footer;
