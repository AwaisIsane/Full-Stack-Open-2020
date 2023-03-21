import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
      setToken(localStorage.getItem('user-token'))
    }
  , [])
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if(!token) {
    //setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>Recommendation</button>
        <button onClick={() => setPage('login')}>Login</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page==='login'} setToken ={setToken} setPage={setPage}/>

      <Recommendation show={page==='recommend'} />
    </div>
  )
}

export default App
