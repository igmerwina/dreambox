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

  const postInputData = (cif, id, dana, target) => {
    let formData = new FormData();
    formData.append('cif', cif);
    formData.append('id_kategori', id);
    formData.append('dana', dana);
    formData.append('target', target);
    return API.post('/dreambox/create', formData);
  }

  return {
    postLogin,
    postInputData
  }

}
