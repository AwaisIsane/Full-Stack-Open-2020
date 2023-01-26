import {  voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotificaion } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdotelist = () => {
    const filterS = useSelector(state=>state.filter)
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote=>anecdote.content.includes(filterS)))
    const dispatch = useDispatch()

    const vote = (antecode) => {
        dispatch(voteAnecdote(antecode.id))
        dispatch(setNotificaion(`you voted for ${antecode.content}`))
    }

    
    return (
        <div>
            <Filter />
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotelist