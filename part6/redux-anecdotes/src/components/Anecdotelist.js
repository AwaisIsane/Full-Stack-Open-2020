import {   voteAnecdoteReq } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdotelist = () => {
    const compareFunc = (a,b) => a.votes>b.votes?-1:1
    const filterS = useSelector(state=>state.filter)
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote=>anecdote.content.includes(filterS)).sort(compareFunc))
    const dispatch = useDispatch()

    const vote = (antecode) => {
        dispatch(voteAnecdoteReq(antecode))
        dispatch(setNotification(`you voted for ${antecode.content}`,5))
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