import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = (blog)=> {
  const token = JSON.parse(localStorage.getItem('creds'))
  const config = {
    headers: { Authorization: `bearer ${token['token']}` },
  }
  const request = axios.post(baseUrl,blog,config)
  return request.then(response => ({...response.data,user:{id:response.data.user,name:token.name,username:token.username}}))
}
const blogSrv = {getAll,postNew}
export default blogSrv;