import Anecdoteform from './components/Ancdoteform'
import Anecdotelist from './components/Anecdotelist'
import Notification from './components/Notification'


const App = () => {
  return (
    <div>
      <Notification/>
      <Anecdotelist />
      <Anecdoteform />
    </div>
  )
}

export default App