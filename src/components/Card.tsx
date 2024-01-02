import React from "react";
import "./styles/card.css";

interface CardProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  color?: string;
  justifyContent?: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className="card"
      style={{
        height: props.height,
        width: props.width,
        backgroundColor: props.color,
        justifyContent: props.justifyContent,
      }}
    >
      {props.children}
    </div>
  );
};

export default Card;
