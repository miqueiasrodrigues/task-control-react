import React from "react";
import "./styles/input.css";

interface InputProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  label?: string;
  value: number | string;
  type: "text" | "number" | "date" | "time";
  readOnly: boolean;
  placeholder?: string;
  valueChange?: (value: any) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-box">
      {props.label !== undefined ? (
        <label htmlFor={props.label.toLowerCase()}>{props.label + ": "}</label>
      ) : (
        false
      )}
      <input
        placeholder={props.placeholder}
        ref={props.inputRef}
        id={props.label?.toLowerCase()}
        className="input"
        type={props.type}
        value={props.value}
        readOnly={props.readOnly}
        onChange={(e) => props.valueChange?.(e.target.value)}
      />
    </div>
  );
};

export default Input;
