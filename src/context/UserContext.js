import React from 'react'

const UserContext = React.createContext({
  userName: '',
  updateUsername: () => {},
})

export default UserContext
