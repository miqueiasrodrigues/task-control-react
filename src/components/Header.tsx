import React from "react";
import "./styles/header.css";
import Icon from "./Icon";
import Button from "./Button";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header">
      <div className="logo">
        <Icon
          imageUrl="https://img.icons8.com/dusk/64/task.png"
          alt="task"
          width="40px"
          height="40px"
        />
        <Button width="150px">
          <Link to={"/"} className="title">
            {props.title}
          </Link>
        </Button>
      </div>

      <nav className="nav">{props.children}</nav>
    </div>
  );
};

export default Header;
