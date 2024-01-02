import React from "react";
import "./app.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Button from "./components/Button";
import Icon from "./components/Icon";
import Box from "./components/Box";

const App: React.FC = () => {
  return (
    <main className="main">
      <Header title="Tesk Control">
        <Button>
          <a
            href="https://www.linkedin.com/in/miquéias-santos-rodrigues-66ba061b4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              imageUrl="https://img.icons8.com/dusk/64/linkedin--v1.png"
              alt="linkedin"
              title="Miqueias LinkedIn"
            />
          </a>
        </Button>
        <Box width="20px" />
        <Button>
          <a
            href="https://github.com/miqueiasrodrigues/miqueiasrodrigues/edit/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              imageUrl="https://img.icons8.com/dusk/64/github.png"
              alt="github"
              title="Miqueias GitHub"
            />
          </a>
        </Button>
      </Header>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export default App;
