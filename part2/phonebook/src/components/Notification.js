import React from 'react';

const Notification = ({ message,clss }) => {
    if (message === "") {
      return null
    }
    return (
      <div className={clss}>
        {message}
      </div>
    )
  }

  export default Notification;
