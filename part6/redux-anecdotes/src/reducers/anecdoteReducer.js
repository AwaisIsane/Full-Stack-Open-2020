const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const compareFunc = (a,b) => a.votes>b.votes?-1:1

const initialState = anecdotesAtStart.map(asObject).sort(compareFunc)
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE_ANECDOTE' :
      const id = action.data.id
      return state.map(obj=>
                        obj.id!==id?obj:{...obj,votes:obj.votes+1}).sort(compareFunc)
    case 'ADD_ANECDOTE' :
      return state.concat(action.data)
    default:
      return state

  }

}

export const voteById = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const addAnecdote = ({content}) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { 
      content,
    id: getId(),
    votes: 0
    }
  }
}

export default reducer