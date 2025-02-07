"use client"
import { useState, useRef, useEffect } from "react";

const Input = ({
  name = "",
  id,
  showInput,
  setShowInput,
  // ShowEditInput,
  // setShowEditInput,
  submit,
}) => {
  const [value, setValue] = useState(name);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleOutSideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      if (setShowInput) setShowInput(false);
      // if (ShowEditInput) setShowEditInput(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit(id, value); // ✅ Now updates parent
      if (setShowInput) setShowInput(false);
      // if (setShowEditInput) setShowEditInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  useEffect(() => {
    setValue(name); 
  }, [name]);  // Ensure value updates when props change

  return (
    <div className="input">
      <input
        key={id}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        type={"text"}
        value={value}
        // className={`${ShowEditInput ? "editInput" : ""} `}
        className=" bg-gray-500 text-white outline-none border-none px-1 my-1"
        ref={inputRef}
        autoFocus
      />
    </div>
  );
};

export default Input;
