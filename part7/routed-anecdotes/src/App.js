import { useState } from 'react'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import {
  Routes,
  Route,
  useMatch,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const navigate = useNavigate()
  const anecdote = match
                   ?anecdotes.find(an =>an.id===Number(match.params.id))
                   :null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/anecdotes')
    showNotification(`New anecdote ${anecdote.content} created by ${anecdote.author}`)

  }
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000);}
  

 

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <h2>{notification}</h2>
      <Routes>
      <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes}/>} />
      <Route path='/about' element={<About />} />
      <Route path='/create' element={
                                      <CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
