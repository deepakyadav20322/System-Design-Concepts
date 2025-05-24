import React, { useRef, useState } from "react";

const Box = () => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [value,setValue] = useState({
        x:0,
        y:0
    });



const handleClick = (dir: 'top' | 'left' | 'right' | 'bottom') => {
    const boundaries = {
    top: value.y <= 0,
    left: value.x <= 0,
    right: value.x >= (boxRef?.current?.offsetWidth ?? 0) - 80,
    bottom: value.y >= (boxRef.current?.clientHeight?? 0) - 144,  
}

    if (boundaries[dir]) return;
    {
        console.log('click')
       const updates = {
        top:{y:value.y-10},
        left:{x:value.x-10},
        right:{x:value.x+10},
        bottom:{y:value.y+10},
       };
       setValue((prevValue) => ({ ...prevValue, ...updates[dir] }))
    }
}
  return (
    <div className="w-full h-[calc(100vh-96px)] ">
      <button onClick={()=>handleClick('top')} className="top button  vertical-b">Top</button>
      <div className="between flex justify-between h-[100%]   ">
        <button onClick={()=>handleClick('left')}  className="button horizontal-b">Left</button>
        <div ref={boxRef} className="wrapper relative w-full"> 
             <div  className={`bg-yellow-600 absolute ransition-all duration-100   h-36 w-36`} style={{
                left:value.x,
                 top:value.y
             }}></div>
             </div>
       
        <button onClick={()=>handleClick('right')}  className="button horizontal-b">Right</button>
      </div>
      <button onClick={()=>handleClick('bottom')}  className="botton  button   vertical-b">Bottom</button>
    </div>
  );
};

export default Box;
