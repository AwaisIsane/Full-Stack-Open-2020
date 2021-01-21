import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => 
<button onClick={props.onClick}>
  {props.text}
</button>;


const Display = (props) => (
  <p>
  {props.text}  {props.count}
  </p>
  )

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  /*const handleButtonClick = (type) => {
    console.log("hellos",type)
    switch (type) {
      case "good":
        setGood(good + 1);
        console.log("good")
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    };
  };*/

  return (
    <>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good+1)} text="good" />
    <Button onClick={() =>setNeutral(neutral+1)} text="neutral" />
    <Button onClick={() =>setBad(bad+1)} text="bad" />
    <h1>statistics</h1>
    <Display text="good" count= {good} />
    <Display text="neutral" count= {neutral} />
    <Display text="bad" count= {bad} />

    </>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root')
)
