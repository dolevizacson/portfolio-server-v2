import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  height: var(--size-navbar-height);

  padding: 1rem;
`;

export const LinkIcon = styled.a`
  display: flex;
  color: var(--color-main-2);

  height: 3.5rem;
  width: 3.5rem;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const Signature = styled.p`
  margin-left: auto;
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  line-height: normal;
`;
