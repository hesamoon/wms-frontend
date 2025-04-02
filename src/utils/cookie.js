const setCookie = (token) => {
  document.cookie = `token=${token}; max-age=${
    1 * 24 * 60 * 60
  }`;
};

const clearCookie = () => {
  setCookie("");
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";") 
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

export { setCookie, getCookie, clearCookie };
