import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from "../reducers/notificationReducer"
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const dispatch = useDispatch()
  const notification = useSelector(state=>state.notification)
  if(notification) {
    setTimeout(()=>dispatch(clearNotification()),5*1000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return (
    null
  )
}

export default Notification