import Cookies from "js-cookie";

// Posteriormente deve ser adicionado o cookie no back e no front com o HttpOnly.

const setCookie = (cName, cValue, cExpiration = 1) => {
  Cookies.set(cName, cValue, { expires: cExpiration });
}

const getCookie = (cName) =>  {
  return Cookies.get(cName);
  }

const removeCookie = (cName) => {
    Cookies.remove(cName);
}

export {
    setCookie,
    getCookie,
    removeCookie
}