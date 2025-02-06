import { useState, useRef, useEffect } from "react";

const Input = ({
  name = "",
  id,
  showInput,
  setShowInput,
  ShowEditInput,
  setShowEditInput,
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
      if (ShowEditInput) setShowEditInput(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (setShowInput) setShowInput(false);

      submit(id, value);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  return (
    <div className={ShowEditInput ? "" : "InputCompo"}>
      <input
        key={id}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        type={"text"}
        value={value}
        className={`${ShowEditInput ? "editInput" : ""} `}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
