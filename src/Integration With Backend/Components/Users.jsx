import React, { useContext } from 'react'
import { AuthContext } from '../Auth'

const Users = () => {
    const {userData} = useContext(AuthContext)
    console.log(userData);
  return (
    <div>
      {userData.map((user) => (
        <div key={user.id} className='text-center'>
          <h1 className='text-[50px]'>{user.name}</h1> 
          <h2 className='text-[40px]'>{user.username}</h2>
        </div>
      ))}
    </div>
      

  )
}

export default Users