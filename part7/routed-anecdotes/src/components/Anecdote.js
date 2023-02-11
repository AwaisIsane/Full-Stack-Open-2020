const Anecdote = ({ anecdote }) => (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>
        <span>has {anecdote.votes} votes</span>
      </p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    

    </div>
  )

export default Anecdote;