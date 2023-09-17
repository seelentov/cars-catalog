import Cookies from 'js-cookie'

export const setCookieLogin = ({id, token, email}) =>{
  Cookies.set('id', id)
  Cookies.set('token', token)
  Cookies.set('email', email)
}

export const getCookieLogin = () => {
  return {
    id: Cookies.get('id'),
    token: Cookies.get('token'),
    email: Cookies.get('email'),
  }
}

export const clearCookieLogin = () => {
    Cookies.remove('id')
    Cookies.remove('token')
    Cookies.remove('email')
}