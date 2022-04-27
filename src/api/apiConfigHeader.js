import Cookies from 'js-cookie'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/'
const  token  =  Cookies.get('cookielogin')
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
export default axios;