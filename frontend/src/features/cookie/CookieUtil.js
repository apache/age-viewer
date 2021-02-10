import cookie from 'react-cookies';

const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

const cookieOptions = {
  path: '/',
  expires: oneYearFromNow,
  secure: false,
  httpOnly: false,
};

export const loadFromCookie = (cookieName) => cookie.load(cookieName);

export const saveToCookie = (cookieName, value, options = cookieOptions) => {
  cookie.save(cookieName, value, options);
};

export const loadAllFromCookie = () => cookie.loadAll();
