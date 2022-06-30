import * as React from 'react';
import { Outlet } from 'react-router-dom';

import AdminNavbar from '../../components/admin-navbar/AdminNavbar.component';
import { useLogOutMutation } from '../../services/auth/auth.service';

import * as style from './style/admin-page.style';

const Admin = (): JSX.Element => {
  const [logOut] = useLogOutMutation();

  return (
    <style.Admin>
      <style.AdminHeader>
        admin
        <style.LogoutButton onClick={() => logOut()}>
          log out
        </style.LogoutButton>
      </style.AdminHeader>
      <AdminNavbar />
      <Outlet />
    </style.Admin>
  );
};

export default Admin;
