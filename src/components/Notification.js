import React from 'react'

const Notification = ({ message, isError = false }) => {
  if (message) {
    const notificationStyle = {
      color: isError ? 'red' : 'green',
      background: 'lightgray',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }

    return <div style={notificationStyle}>{message}</div>
  }

  return null
}

export default Notification
