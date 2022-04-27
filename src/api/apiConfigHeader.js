import Cookies from 'js-cookie'
const tokendata =()=>{
    const  token  =  Cookies.get('cookielogin')
    return token
}
axiosconfig.defaults.headers.common = {'Authorization': `bearer ${tokendata}`}
export default axiosconfig;