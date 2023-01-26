import { createSlice } from '@reduxjs/toolkit'
import anecdotesSrv from '../services/antecodes'



const initialState = [] 

const antecodeSlice = createSlice({
  name:'antecodes',
  initialState,
  reducers:{
    addAnecdote(state,action) {
      return state.concat(action.payload)
    },
    voteAnecdote(state,action) {
      const id = action.payload.id
      const votes = action.payload.votes
      return state.map(obj=>
                        obj.id!==id?obj:{...obj,votes:votes})
    },
    setAntecodeArray(state,action) {
      return action.payload

    }
  }
})

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesSrv.getAll()
    dispatch(setAntecodeArray(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdotesSrv.createNew({anecdote})
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdoteReq = anecdote => {
  return async dispatch => {
    const retAnecdote = await anecdotesSrv.voteById(anecdote);
    dispatch(voteAnecdote(retAnecdote))
  }
}

export const { addAnecdote, voteAnecdote,setAntecodeArray } = antecodeSlice.actions
export default antecodeSlice.reducer