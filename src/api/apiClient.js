import axios from 'axios';
import Cookies from 'js-cookie'
const  token  =  Cookies.get('cookieLogin')
export const creatBrand = async(data)=>{
 const res = await axios.post("http://localhost:5000/api/brand/create", data , {headers: {Authorization: `Bearer ${token}`} })
  return res;
}


export const getBrand = async()=>{
  const res = await axios.get("http://localhost:5000/api/brand/all", {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }
 
 
 export const deleteBrandApi = async(id)=>{
  const res = await axios.delete(`http://localhost:5000/api/brand/delete/${id}`, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }
 
  
 export const editBrandApi = async(id)=>{
  const res = await axios.get(`http://localhost:5000/api/brand/${id}`, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 export const updateBrandApi = async(body)=>{
  const res = await axios.post(`http://localhost:5000/api/brand/update`,body, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }
 

 export const creatType= async(data)=>{
  const res = await axios.post("http://localhost:5000/api/type/create", data , {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }
 
 export const getType = async()=>{
  const res = await axios.get("http://localhost:5000/api/type/all", {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 export const deleteTypeApi = async(id)=>{
  const res = await axios.delete(`http://localhost:5000/api/type/delete/${id}`, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 export const editTypeApi = async(id)=>{
  const res = await axios.get(`http://localhost:5000/api/type/${id}`, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 export const updateTypeApi = async(body)=>{
  const res = await axios.post(`http://localhost:5000/api/type/update`,body, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 export const getProduct = async()=>{
  const res = await axios.get("http://localhost:5000/api/product/all", {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 export const postProduct = async(body)=>{
  const res = await axios.post("http://localhost:5000/api/product/create", body ,{headers: {Authorization: `Bearer ${token}`} })
   return res;
 }


 export const deleteProductApi = async(id)=>{
  const res = await axios.delete(`http://localhost:5000/api/product/delete/${id}`, {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }

 ///size
 export const creatSizeApi = async(data)=>{
  const res = await axios.post("http://localhost:5000/api/size/create", data , {headers: {Authorization: `Bearer ${token}`} })
   return res;
 }
 
 
 export const getSizeApi = async()=>{
   const res = await axios.get("http://localhost:5000/api/size/all", {headers: {Authorization: `Bearer ${token}`} })
    return res;
  }
  
  
  export const deleteSizeApi = async(id)=>{
   const res = await axios.delete(`http://localhost:5000/api/size/delete/${id}`, {headers: {Authorization: `Bearer ${token}`} })
    return res;
  }
  
   
  export const editSizeApi = async(id)=>{
   const res = await axios.get(`http://localhost:5000/api/size/${id}`, {headers: {Authorization: `Bearer ${token}`} })
    return res;
  }
 
  export const updateSizeApi = async(body)=>{
   const res = await axios.post(`http://localhost:5000/api/size/update`,body, {headers: {Authorization: `Bearer ${token}`} })
    return res;
  }

  // user


  export const activeApi = async(body)=>{
    const res = await axios.post(`http://localhost:5000/api/auth/active`,body, {headers: {Authorization: `Bearer ${token}`} })
     return res;
   }
  
   export const getUserApi = async()=>{
    const res = await axios.get(`http://localhost:5000/api/auth/list-user`, {headers: {Authorization: `Bearer ${token}`} })
     return res;
   }
  export const createBlog = async(body)=>{
   const res = await axios.post(`http://localhost:5000/api/blog/create`,body, {headers: {Authorization: `Bearer ${token}`} })
    return res;
  }
