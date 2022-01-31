import * as cookieParser from 'cookie-parser';
import { CookieOptions } from 'express';

export default (): {
  cookieSecret: string;
  cookieOptions: cookieParser.CookieParseOptions;
  cookieJwtKey: string;
  cookieJwtOptions: CookieOptions;
} => ({
  cookieSecret: 'cookie secret',
  cookieOptions: {},
  cookieJwtKey: 'jwt',
  cookieJwtOptions: {
    httpOnly: true,
    maxAge: parseInt(process.env.COOKIE_JWT_MAX_AGE),
  },
});
