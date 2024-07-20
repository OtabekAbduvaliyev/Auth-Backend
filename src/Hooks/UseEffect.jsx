import React,{useEffect, useState} from 'react'

const UseEffect = () => {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUsers(json))
    },[])
  return (
    <div>

    {users.map((user)=>{
        return(
            <pre>{JSON.stringify(user)}</pre>
        )
    })}
    </div>
  )
}

export default UseEffect