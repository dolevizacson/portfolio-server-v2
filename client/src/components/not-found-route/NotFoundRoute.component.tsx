import * as React from 'react';

import * as style from './style/not-found-route.style';

const NotFoundRoute = (): JSX.Element => {
  return (
    <style.NotFoundRoute>
      <style.NotFoundRouteHeader>404</style.NotFoundRouteHeader>
      <style.NotFoundRouteBody>
        oops! this page doesn't really exist
      </style.NotFoundRouteBody>
    </style.NotFoundRoute>
  );
};

export default NotFoundRoute;
