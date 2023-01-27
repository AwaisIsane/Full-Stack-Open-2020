import {  connect } from 'react-redux'
import {  createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdoteform = (props) => {

    const createnew = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value
        const anecdote = {content,votes:0}
        props.createAnecdote(anecdote)
        event.target.anecdote.value = ''
        props.setNotification(`you created antecode ${content}`,5)
      }

    return (<div><h2>create new</h2>
    <form onSubmit={createnew}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form></div>)
}

export default connect(
  null,
  {createAnecdote,setNotification}
)(Anecdoteform);