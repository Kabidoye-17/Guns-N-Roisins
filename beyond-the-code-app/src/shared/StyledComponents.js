import styled from 'styled-components';

// Complete Tines design system color palette
export const theme = {
  // Primary Purple Family
  primary: '#8d75e6',
  primaryHover: '#7f69ce',
  primaryDark: '#6956a8',
  primaryDarker: '#4d3e78',
  primaryDarkest: '#32274b',

  // Accent Colors - Pink/Magenta
  pink: '#ee86b7',
  pinkHover: '#d96ba0',
  pinkMedium: '#E269A4',

  // Accent Colors - Blue/Cyan
  blue: '#4E8FD0',
  blueBright: '#0038DE',
  cyan: '#75AADE',

  // Accent Colors - Green/Teal
  success: '#2dbf8c',
  successDark: '#25A871',

  // Accent Colors - Coral/Red
  coral: '#f47e3f',
  coralBright: '#F4473F',

  // Accent Colors - Yellow/Orange
  gold: '#F0A848',
  goldLight: '#FABE64',
  goldWarm: '#F5A847',
  warning: '#F0A848',
  error: '#f47e3f',

  // Neutrals - Text
  textDark: '#32274b',
  textMedium: '#4d3e78',
  textLight: '#7f69ce',
  textNearBlack: '#231A32',

  // Neutrals - Backgrounds
  white: '#ffffff',
  background: '#f8f2f6',
  backgroundLight: '#f3ecf7',
  backgroundLavender: '#EADFF8',
  backgroundGray: '#BFBAB2',

  // Borders & Overlays
  border: 'rgba(77, 62, 120, 0.1)',
  borderSolid: '#e0dce6',
  overlay: 'rgba(35, 26, 50, 0.3)',
  overlayLight: 'rgba(255, 255, 255, 0.06)',
  overlayWhite: 'rgba(255, 255, 255, 0.2)',

  // Typography - Tines-inspired font stack
  fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSerif: "'Playfair Display', Georgia, serif",
  fontMono: "'JetBrains Mono', 'Courier New', monospace"
};

// Reusable Card component - Tines style
export const Card = styled.div`
  background: ${theme.white};
  border-radius: ${props => props.radius || '8px'};
  padding: ${props => props.padding || '24px'};
  box-shadow: 0 1px 3px rgba(141, 117, 230, 0.08);
  border: 1px solid ${theme.border};
  text-align: ${props => props.align || 'left'};
  ${props => props.minHeight && `min-height: ${props.minHeight};`}

  @media (max-width: 768px) {
    padding: ${props => props.mobilePadding || '18px'};
  }
`;

// Primary button - Tines style
export const PrimaryButton = styled.button`
  font-family: ${theme.fontSans};
  padding: 9px 18px;
  background: ${props => props.primary ? theme.primary : theme.white};
  color: ${props => props.primary ? theme.white : theme.textDark};
  border: 1px solid ${props => props.primary ? theme.primary : theme.border};
  border-radius: 7px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  line-height: 1.5;

  &:hover:not(:disabled) {
    background: ${props => props.primary ? theme.primaryHover : theme.background};
    border-color: ${props => props.primary ? theme.primaryHover : theme.borderSolid};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(141, 117, 230, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 11px;
  }
`;

// Heading component - Tines typography
export const Heading = styled.h2`
  font-family: ${theme.fontSerif};
  color: ${theme.textDark};
  font-size: ${props => props.size || '21px'};
  font-weight: 700;
  margin: ${props => props.margin || '0'};
  line-height: 1.3;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: ${props => props.mobileSize || '16px'};
  }
`;

// Label text (for question numbers, etc) - Tines style
export const Label = styled.div`
  font-family: ${theme.fontSans};
  color: ${theme.primary};
  font-size: ${props => props.size || '11px'};
  font-weight: 600;
  margin-bottom: ${props => props.marginBottom || '12px'};
  text-transform: ${props => props.uppercase ? 'uppercase' : 'none'};
  letter-spacing: ${props => props.uppercase ? '0.05em' : 'normal'};
`;

// Container for content with flex
export const Container = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth || '675px'};
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || '24px'};
`;

// Grid container
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(2, 1fr)'};
  grid-template-rows: ${props => props.rows || 'auto'};
  gap: ${props => props.gap || '15px'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: ${props => props.mobileGap || '12px'};
  }
`;

// Interactive box component (for quiz options, etc) - Tines style
export const InteractiveBox = styled.button`
  font-family: ${theme.fontSans};
  padding: ${props => props.padding || '24px 18px'};
  border: 2px solid ${props => props.borderColor || theme.border};
  background: ${props => props.bgColor || theme.white};
  border-radius: 7px;
  text-align: center;
  font-size: ${props => props.fontSize || '13px'};
  font-weight: 500;
  color: ${theme.textDark};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: ${props => props.minHeight || '90px'};
  position: relative;
  line-height: 1.5;

  &:hover {
    ${props => !props.disabled && `
      border-color: ${theme.primary};
      background: ${theme.backgroundLight};
      transform: translateY(-2px);
      box-shadow: 0 3px 9px rgba(141, 117, 230, 0.12);
    `}
  }

  @media (max-width: 768px) {
    padding: 18px 15px;
    font-size: 12px;
    min-height: 75px;
  }
`;

// Info/Explanation box - Tines style
export const InfoBox = styled.div`
  font-family: ${theme.fontSans};
  padding: 15px 18px;
  background: ${theme.backgroundLight};
  border-left: 3px solid ${props => props.accentColor || theme.primary};
  border-radius: 7px;
  color: ${theme.textMedium};
  font-size: 12px;
  line-height: 1.6;
  border: 1px solid ${theme.border};
  border-left: 3px solid ${props => props.accentColor || theme.primary};

  strong {
    color: ${theme.textDark};
    font-weight: 600;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 11px;

    strong {
      font-size: 11px;
    }
  }
`;

// Button group container
export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.gap || '9px'};
  justify-content: ${props => props.justify || 'flex-end'};
`;

// Stat display component
export const StatDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const StatLabel = styled.div`
  font-size: 9px;
  color: ${theme.textLight};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.div`
  font-size: ${props => props.size || '18px'};
  font-weight: 700;
  color: ${props => props.color || theme.primaryDark};
`;

// Centered text span
export const CenteredText = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
