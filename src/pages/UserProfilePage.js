import React from 'react'
import UserProfile from '../features/user/component/UserProfile'
import Navbar from '../features/navbar/Navbar'

function UserProfilePage () {
  return (
    <div>
      <Navbar>
        <UserProfile />
      </Navbar>
    </div>
  )
}

export default UserProfilePage
