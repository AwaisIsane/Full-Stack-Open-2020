import {  useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotificaion } from '../reducers/notificationReducer'

const Anecdoteform = () => {
    const dispatch = useDispatch()

    const createnew = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        dispatch(addAnecdote({content}))
        dispatch(setNotificaion(`you created antecode ${content}`))
      }

    return (<div><h2>create new</h2>
    <form onSubmit={createnew}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form></div>)
}

export default Anecdoteform;