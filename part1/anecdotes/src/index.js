import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => 
 (<button onClick={props.onClick}>
  {props.text}
</button>);

const Anecdote = ({ind,points,anecdotes}) => <>
<p>{anecdotes[ind]}</p>
has {points[ind]} votes <br/>
</>

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [points,setPoints] = useState(new Array(6).fill(0));
  const [mostVtes,setmostVtes] = useState(0);


  const rno = () => Math.floor(Math.random() * (anecdotes.length));

  const updatePoints = (ind,points) =>{ 
    const copy = { ...points};
    copy[ind]+=1;
    if (copy[ind]>copy[mostVtes]) {setmostVtes(ind)}                      
    return copy;}
                        
                                      return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote ind={selected} points ={points} anecdotes={anecdotes}/>
      <Button text="next anecdote" onClick = {() => setSelected(rno())} />
      <Button text="vote" onClick = {() => setPoints(updatePoints(selected,points))} />
      <h1>Anecdote with most Votes</h1>
      <Anecdote ind={mostVtes} points ={points} anecdotes={anecdotes}/>
    </div>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
