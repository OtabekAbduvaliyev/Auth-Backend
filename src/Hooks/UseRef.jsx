import React,{useEffect, useRef, useState} from 'react'

const UseRef = () => {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();
  
    useEffect(() => {
      prevCountRef.current = count;
      console.log('rendering');
    }, [count]);
  
    const prevCount = prevCountRef.current;
  
    return (
      <div>
        <p>Current Count: {count}</p>
        <p>Previous Count: {prevCount}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }

export default UseRef