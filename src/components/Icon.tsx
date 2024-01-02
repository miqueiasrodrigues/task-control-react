import React from "react";
import "./styles/icon.css";

interface IconProps {
  title?: string;
  imageUrl: string;
  alt: string;
  width?: string;
  height?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  return (
    <img
      className="icon"
      title={props.title}
      width={props.width}
      height={props.height}
      src={props.imageUrl}
      alt={props.alt}
    />
  );
};

export default Icon;
