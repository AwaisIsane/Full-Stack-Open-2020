import { useSelector } from "react-redux";

const Notification = () => {
  const messages = useSelector(state=>state.notification)

  if (!messages.message) {
    return null;
  }

  return <div className={messages.class}>{messages.message}</div>;
};

export default Notification;
