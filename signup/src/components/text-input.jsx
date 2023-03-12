import { useRef } from "react";
// import "../css/text.css";

var Textinput = ({eyecon}) => {
  const inputRef = useRef();
  return (
    <>
      <input className="textinput" ref={inputRef}></input>
    </>
  );
}

export default Textinput;
