import * as React from 'react';

import * as style from './style/footer.style';

import { StyledIcon } from '@styled-icons/styled-icon';

import {
  Github,
  LinkedinSquare,
  FacebookCircle,
} from '@styled-icons/boxicons-logos';

const linkList: { icon: StyledIcon; url: string }[] = [
  {
    icon: FacebookCircle,
    url: 'https://www.facebook.com/dolev.izacson',
  },
  {
    icon: LinkedinSquare,
    url: 'https://www.linkedin.com/in/dolev-izacsson-084087109/',
  },
  {
    icon: Github,
    url: 'https://github.com/dolevizacson',
  },
];

const Footer = (): JSX.Element => {
  const renderedLinkList = React.useMemo(() => {
    return (
      <>
        {linkList.map((linkObject) => {
          return (
            <style.LinkIcon
              key={linkObject.url}
              href={linkObject.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <linkObject.icon />
            </style.LinkIcon>
          );
        })}
      </>
    );
  }, []);

  return (
    <style.Footer>
      {renderedLinkList}
      <style.Signature>
        made by
        <br />
        Dolev Izacson
      </style.Signature>
    </style.Footer>
  );
};

export default Footer;
