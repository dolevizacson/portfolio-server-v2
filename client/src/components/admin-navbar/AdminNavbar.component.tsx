import * as React from 'react';
import { NavLink, matchPath, resolvePath, useLocation } from 'react-router-dom';

import * as style from './style/admin-navbar.style';

const linksInfo: { name: string; route: string }[] = [
  { name: 'add project', route: '/admin/new/project' },
  { name: 'add skills category', route: '/admin/new/skills-category' },
  { name: 'add skill', route: '/admin/new/skill' },
  { name: 'add task', route: '/admin/new/task' },
  { name: 'add blog post', route: '/admin/new/blog-post' },
];

const AdminNavbar = (): JSX.Element => {
  const location = useLocation();

  const renderedLinksList = React.useMemo(() => {
    return linksInfo.map((link) => {
      const currentPath = resolvePath(link.route).pathname;
      return (
        <NavLink key={link.name} to={link.route}>
          <style.AdminNavbarButton
            isSelected={
              matchPath({ path: currentPath, end: false }, location.pathname)
                ? true
                : false
            }
          >
            {link.name}
          </style.AdminNavbarButton>
        </NavLink>
      );
    });
  }, [location]);

  return <style.AdminNavbar>{renderedLinksList}</style.AdminNavbar>;
};

export default AdminNavbar;
