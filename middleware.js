// Make locals Middleware
// local변수를 global변수로 사용할 수 있도록 만들어 주는 Middleware

import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
