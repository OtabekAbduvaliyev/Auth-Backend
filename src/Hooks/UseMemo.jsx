import React, { useMemo, useState } from 'react';

const slowFunction = (num) => {
    for (let i = 0; i < 10000000; i++) {}
    console.log('calling slow func');
    return num * 2;
}

const UseMemo = () => {
    const [state, setState] = useState({ count: 4, text: 'four' });
    const count = state.count;
    const text = state.text;
    const [color, setColor] = useState(false);

    const colorStyle = {
        color: color ? 'black' : 'aqua'
    };

    const add = () => {
        setState(prevValue => {
            return { ...prevValue, count: prevValue.count + 1 }
        });
    };

    const remove = () => {
        setState(prevValue => {
            return { ...prevValue, count: prevValue.count - 1 }
        });
    };

    const number = useMemo(() => {
        console.log('number increased');
        return slowFunction(count);
    }, [count]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <button onClick={add}>Add</button>
            <h1>{count}</h1>
            <h1 style={colorStyle}>{text}</h1>
            <h1>{number}</h1>
            <button onClick={remove}>Remove</button>
            <button onClick={() => setColor(prevColor => !prevColor)}>Toggle</button>
        </div>
    );
}

export default UseMemo;
