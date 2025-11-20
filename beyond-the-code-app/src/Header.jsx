import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { House, Headphones } from '@phosphor-icons/react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #ddd6fe 100%);
  padding: 0 30px;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 0 18px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1050px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;

  @media (max-width: 768px) {
    height: 45px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogoIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 27px;
    height: 27px;
  }
`;

const LogoText = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const NavLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$isActive ? '60%' : '0'};
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 60%;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 5px 9px;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

const NavIconWrapper = styled.span`
  display: none;

  @media (max-width: 480px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/Guns-N-Roisins' || location.pathname === '/Guns-N-Roisins/';
  const isEpisode = location.pathname.includes('/episode/');

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon>
            <Headphones size={24} weight="bold" color="white" />
          </LogoIcon>
          <LogoText>Beyond the Code</LogoText>
        </Logo>
        <Nav>
          <NavLink to="/" $isActive={isHome}>
            <NavIconWrapper>
              <House size={20} weight="bold" />
            </NavIconWrapper>
            <span>Home</span>
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
