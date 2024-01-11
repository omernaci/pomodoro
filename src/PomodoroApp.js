import React, { useState, useEffect } from "react";
import { Button, Typography, Table, Menu } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const PomodoroApp = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          if (isBreakTime) {
            // Handle break time logic here
            setHistory((prevHistory) => [
              ...prevHistory,
              { type: "Break", duration: 5 },
            ]);
          } else {
            setIsBreakTime(true);
            setMinutes(5); // Set break time to 5 minutes
            setSeconds(0);
            setHistory((prevHistory) => [
              ...prevHistory,
              { type: "Pomodoro", duration: 25 },
            ]);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, minutes, seconds, isBreakTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreakTime(false);
    setMinutes(25);
    setSeconds(0);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return (
    <div>
      <Menu mode="horizontal" theme="dark" style={{ marginBottom: "1rem" }}>
        <Menu.Item key="1">Pomodoro App</Menu.Item>
      </Menu>
      <Title level={2}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Title>
      <div style={{ marginBottom: "1rem" }}>
        {isRunning ? (
          <Button icon={<PauseCircleOutlined />} onClick={stopTimer}>
            Stop
          </Button>
        ) : (
          <Button icon={<PlayCircleOutlined />} onClick={startTimer}>
            Start
          </Button>
        )}
        <Button
          icon={<ReloadOutlined />}
          onClick={resetTimer}
          style={{ marginLeft: "0.5rem" }}
        >
          Reset
        </Button>
      </div>
      <Table columns={columns} dataSource={history} />
    </div>
  );
};

export default PomodoroApp;
