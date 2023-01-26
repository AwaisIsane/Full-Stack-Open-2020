import {  useDispatch } from 'react-redux'
import {  createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdoteform = () => {
    const dispatch = useDispatch()

    const createnew = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        const anecdote = {content,votes:0}
        dispatch(createAnecdote(anecdote))
        event.target.anecdote.value = ''
        dispatch(setNotification(`you created antecode ${content}`,5))
      }

    return (<div><h2>create new</h2>
    <form onSubmit={createnew}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form></div>)
}

export default Anecdoteform;