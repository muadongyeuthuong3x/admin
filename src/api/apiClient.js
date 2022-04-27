import axios from 'axios';
import Cookies from 'js-cookie'
const  token  =  Cookies.get('cookieLogin')
export const creatBrand = async(data)=>{
 const res = await axios.post("http://localhost:5000/api/brand/create", data , {headers: {Authorization: `Bearer ${token}`} })
  return res;
}

