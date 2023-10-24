import React from 'react'
import Navbar from '../features/navbar/Navbar'
import Userorder from '../features/user/component/UserOrders'

function UserOrderPage () {
  return (
    <div>
      <Navbar>
      <h1 className='mx-auto text-2xl'>My Order's</h1>
        <Userorder />
      </Navbar>
    </div>
  )
}

export default UserOrderPage
