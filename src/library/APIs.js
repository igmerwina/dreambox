import { create } from 'apisauce';

BASE_URL = 'http://mydreambox.herokuapp.com';

export const URLParameterBuilder = (data) => {
  return Object.keys(data).map((key) => {
      return [key, data[key]].map(encodeURIComponent).join("=");
  }).join("&");
};

export const APIDREAMBOX = () => {
  const API = create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    }
  });

  const postLogin = (email, password) => {
    console.log("email: " + email)
    console.log("password: " + password)
    const param = {
      email: email,
      password: password
    };
    return API.post('/auth/login', param);
  }

  const postInputData = (cif, id, dana, target) => {
    const param = { 
      cif: cif, 
      id: id_kategori, 
      dana: nominal,
      target
    }
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
