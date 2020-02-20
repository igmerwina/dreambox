import { create } from 'apisauce';

BASE_URL = 'http://mydreambox.herokuapp.com';

export const APIDREAMBOX = () => {
  const API = create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const postLogin = (email, password) => {
    console.log("email: " + email)
    console.log("password: " + password)
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return API.post('/auth/login', formData);
  }

  return {
    postLogin
  }

}
