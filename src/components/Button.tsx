import React from "react";
import "./styles/button.css";

interface ButtonProps {
  color?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  action?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className="button"
      style={{
        backgroundColor: props.color ? props.color : "transparent",
        width: props.width,
        height: props.height,
      }}
      onClick={props?.action}
    >
      {props.children}
    </button>
  );
};

export default Button;
