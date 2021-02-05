import axios from 'axios';

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
    const promise = axios.get(baseURL);
    return  promise.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
  }

  const remove = id =>  axios.delete(`${baseURL}/${id}`);
    
      
  



export default {getAll,create,remove}