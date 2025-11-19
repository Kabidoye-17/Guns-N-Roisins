import styled from 'styled-components';
import { Headphones, GithubLogo, TwitterLogo, InstagramLogo } from '@phosphor-icons/react';

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #ddd6fe 100%);
  padding: 40px 40px 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 30px 24px 24px;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandName = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
`;

const BrandTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    transform: translateX(4px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1400px;
  margin: 40px auto 0;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`;

const Copyright = styled.p`
  margin: 0;
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterBrand>
          <BrandLogo>
            <LogoIcon>
              <Headphones size={24} weight="bold" color="white" />
            </LogoIcon>
            <BrandName>Beyond the Code</BrandName>
          </BrandLogo>
          <BrandTagline>
            Exploring the stories behind the world's most innovative tech leaders and the future they're building.
          </BrandTagline>
        </FooterBrand>

      </FooterContent>

      <FooterBottom>
        <Copyright>© {currentYear} Beyond the Code. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;
