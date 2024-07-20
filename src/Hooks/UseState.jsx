import React,{useEffect, useState} from 'react'

const UseState = () => {
//     const [state,setState] = useState({count:4,text:'four'})
//     const count = state.count
//     const text = state.text
//     const add = () =>{
//         setState(prevValue => {
//             return{...prevValue, count:prevValue.count + 1} 
//         }
//             )

//     }
//     const remove = () =>{
//         setState(prevValue => {
//             return{...prevValue, count:prevValue.count - 1}
//         })
//     }
//   return (
//     <div style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
//         <button onClick={add}>Add</button>
//         <h1>{count}</h1>
//         <h1>{text}</h1>
//         <button onClick={remove}>Remove</button>
//     </div>
//   )
const [number, setNumber] = useState(0);

function handleClick() {
  setNumber(number + 1); // This will update the state and re-render the component.
}
useEffect(()=>{
    console.log('renderning');
},[])
return (
  <div>
    <p>Number: {number}</p>
    <button onClick={handleClick}>Increase</button>
  </div>
);
}

export default UseState