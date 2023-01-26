import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Anecdoteform from './components/Ancdoteform'
import Anecdotelist from './components/Anecdotelist'
import Notification from './components/Notification'
import { getAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect( ()=> {
    dispatch(getAnecdotes())
  },[dispatch])


  return (
    <div>
      <Notification/>
      <Anecdotelist />
      <Anecdoteform />
    </div>
  )
}

export default App