import React, { useState, useEffect } from "react";
import Quotes from "./components/Quotes";
import { Button, Typography, Table, Progress } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

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
            setHistory((prevHistory) => [
              ...prevHistory,
              {
                title: "Break Session",
                duration: 5,
              },
            ]);
            setIsBreakTime(false);
            setMinutes(25);
            setSeconds(0);
          } else {
            setIsBreakTime(true);
            setMinutes(5);
            setSeconds(0);
            setHistory((prevHistory) => [
              ...prevHistory,
              {
                title: "Pomodoro Session",
                duration: 25,
              },
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
    setHistory([]);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  const totalSeconds = minutes * 60 + seconds;
  const progress = (totalSeconds / (isBreakTime ? 300 : 1500)) * 100;

  return (
    <div>
      <div className="navbar">
        <h1>Pomodoro App</h1>
      </div>
      <Quotes />
      <Title level={2}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Title>
      <Progress percent={progress} showInfo={false} strokeColor={twoColors} />
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

      <style>{`
        .navbar {
          background: linear-gradient(to right, ${twoColors["0%"]}, ${twoColors["100%"]});
          padding: 1rem;
          text-align: center;
        }

        .navbar h1 {
          margin: 0;
          font-size: 1.5rem;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default PomodoroApp;
