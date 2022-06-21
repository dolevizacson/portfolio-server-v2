import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Admin = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  display: grid;
  grid-template-rows: repeat(2, max-content) 1fr;
  flex: 1;
  gap: 3rem;
`;

export const AdminHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;
`;

export const LogoutButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width:15rem;
  height: 4.5rem;
  padding: 0.6rem 0.4rem;
  margin: 0.4rem 0;
`;
