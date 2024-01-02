import React from "react";

interface BoxProps {
  width?: string;
  height?: string;
}

const Box: React.FC<BoxProps> = (props) => {
  return <div style={{ width: props.width, height: props.height }}></div>;
};

export default Box;
