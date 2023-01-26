import {  useDispatch } from 'react-redux'
import {changeFilter} from '../reducers/filterReducer'
const Filter = () => {
    const handleChange = (event) => {
      dispatch(changeFilter(event.target.value))
    }

    const dispatch = useDispatch()
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name='filter' onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter