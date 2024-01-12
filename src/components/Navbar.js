import React from "react";
import { Button } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const Navbar = ({ startTimer, stopTimer, resetTimer }) => {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    background: "#f0f0f0",
  };

  const buttonStyle = {
    marginRight: "0.5rem",
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={{ margin: 0 }}>Pomodoro App</h1>
      <div>
        <Button
          icon={<PlayCircleOutlined />}
          onClick={startTimer}
          style={buttonStyle}
        >
          Start
        </Button>
        <Button
          icon={<PauseCircleOutlined />}
          onClick={stopTimer}
          style={buttonStyle}
        >
          Stop
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={resetTimer}
          style={buttonStyle}
        >
          Reset
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
