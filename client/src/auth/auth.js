import axios from 'axios';
import swal from 'sweetalert';

export const signup = user => {
  return axios.post('http://localhost:3001/signup', { 
    name: user.name,
    email: user.email,
    password: user.password
  })
  .then(res => {
    swal("Congratulation!", `${res.data.message}`, "success");
  });
}

export const signin = user => {
  return axios.post('http://localhost:3001/signin', { 
    email: user.email,
    password: user.password
  })
  .then(res => {
    if(typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(res.data)); 
    }
  });
}

export const signout = (next) => {
  if(typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
  next();
  return axios.get('http://localhost:3001/signout')
    .then(res => swal("Notification!", `${res.data.message}`, "success"))
    .catch(err => console.log(err));
}