
import { useState, useRef, useEffect } from "react";

const Input = ({ name = "", id, setShowInput, submit }) => {
  const [value, setValue] = useState(name);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submit(id, value); // Update before closing input
      setShowInput(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowInput(false);
      }
    });

    return () => document.removeEventListener("mousedown", handleKeyDown);
  }, []);

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={inputRef}
      autoFocus
      spelcheck="off"
    />
  );
};

export default Input;
