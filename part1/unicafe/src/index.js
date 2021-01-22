import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => 
<button onClick={props.onClick}>
  {props.text}
</button>;


const Statistic = (props) => (
  <tr>
  <td>{props.text}</td>
  <td>{props.count}</td>
  </tr>
  )

const percentpos = (g,n,b) => g/(g+n+b) *100;

const average  = (g,n,b) => (g + b*-1)/(g+b+n); 

const Statistics = ({g,n,b}) => {
  if ((g+n+b) === 0) {
      return (
        <>
        No feedback given
        </>
      )
  }
  
  return (
  <table >
  <tbody>
  <Statistic text="good" count = {g} />
  <Statistic text="neutral" count = {n} />
  <Statistic text="bad" count = {b} />
  <Statistic text="all" count = {g+n+b} />
  <Statistic text="average" count = {average(g,n,b)} />
  <Statistic text="positive" count = {percentpos(g,n,b)} />
  </tbody></table>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good+1)} text="good" />
    <Button onClick={() =>setNeutral(neutral+1)} text="neutral" />
    <Button onClick={() =>setBad(bad+1)} text="bad" />
    <h1>statistics</h1>
    <Statistics g={good} n={neutral} b={bad} />
    </>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root')
)
