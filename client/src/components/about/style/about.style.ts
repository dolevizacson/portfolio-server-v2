import styled from 'styled-components';
import { motion } from 'framer-motion';

export const About = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  ${(props) => props.theme.mixins.centerContent}
`;

export const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 47rem), 1fr));
  justify-items: center;
`;

export const Info = styled.header`
  display: grid;
  grid-gap: 1.4rem;
`;

export const Header = styled.h1`
  font-size: 4.5rem;
  text-align: center;

  padding: 1rem;

  hyphens: none;
`;

export const NoLineBreak = styled.span`
  white-space: nowrap;
`;

export const Description = styled.p`
  font-size: 2.7rem;
  font-family: 'ZCOOL QingKe HuangYou', cursive;
  text-transform: uppercase;
  font-weight: 400;
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.07rem;

  padding: 1rem;
`;

export const Quote = styled.blockquote`
  display: flex;
  justify-content: center;

  font-size: 1.9rem;
  text-transform: uppercase;
  text-align: center;
  font-family: 'ZCOOL QingKe HuangYou', cursive;
  font-weight: 400;
  letter-spacing: 0.07rem;

  padding: 1rem;
`;

export const QuoteMarks = styled.div`
  color: var(--color-main-2);
  height: 1rem;
  width: 1rem;
`;

export const FrontQuoteMark = styled(QuoteMarks)`
  transform: translateY(-1rem);

  margin-right: 0.6rem; ;
`;

export const BackQuoteMark = styled(QuoteMarks)`
  transform: translateY(0.7rem);

  margin-left: 0.4rem;
`;

export const ImageContainer = styled.div`
  grid-column: 1/2;

  margin: 1rem;

  height: 40rem;
  
  overflow: hidden;

  position: relative;

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    box-shadow: inset 0 0 8px 15px var(--color-main-1);
  }
`;
