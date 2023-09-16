/* eslint-disable no-useless-escape */


export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const saveUserToCookie = ({ email, password }) => {
  document.cookie = `ue=${email};up=${password}`
}