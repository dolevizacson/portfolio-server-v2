import * as React from 'react';

import * as style from './style/app.style';

import Main from '../components/main/Main.component';
import AppRoutes from '../components/app-routes/AppRoutes.component';
import Navbar from '../components/navbar/Navbar.component';
import { useAppSelector } from '../redux/redux.hooks';
import Footer from '../components/footer/Footer.component';
import MainTheme from '../style/MainTheme.style';
import GlobalStyle from '../style/Global.style';
import { ColorContext } from '../common/contexts/app-color.context';

import { useAnimation } from 'framer-motion';

const App = (): JSX.Element => {
  const appDirtyState = useAppSelector((state) => state.isDirty);
  const controls = useAnimation();

  React.useEffect(() => {
    const handler = (e: Event) => {
      if (appDirtyState.isDirty) {
        e.preventDefault();
        e.returnValue = true;
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [appDirtyState]);

  return (
    <ColorContext.Provider value={controls}>
      <MainTheme>
        <GlobalStyle />
        <style.App animate={controls}>
          <Navbar />
          <Main>
            <AppRoutes />
          </Main>
          <Footer />
        </style.App>
      </MainTheme>
    </ColorContext.Provider>
  );
};

export default App;
