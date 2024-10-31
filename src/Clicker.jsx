import React, { useState, useEffect } from "react";
import './Clicker.css';

const ClickerApp = () => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (active) {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    let timer;

    if (active && remaining > 0) {
      timer = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    } else if (remaining === 0) {
      setActive(false);
    }

    return () => clearInterval(timer);
  }, [active, remaining]);

  const handleStart = () => {
    const seconds = parseInt(time, 10);
    if (isNaN(seconds) || seconds <= 0) return;

    setRemaining(seconds);
    setCount(0);
    setActive(true);
    setTime('');
  };

  const calculateCps = () => {
    return (count / (remaining === 0 ? 1 : remaining)).toFixed(2);
  };

  return (
    <div className="container">
      <h1>Кликер</h1>
      <input
        type="number"
        placeholder="Введите время "
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleStart} className="countdown-button">
        Начать отсчет
      </button>
      <div className="timer">
        {active ? remaining : "Кликни кнопку для начала!"}
      </div>
      <button onClick={handleClick} className="click-button">
        Кликни меня!
      </button>
      <h2>Количество кликов: {count}</h2>
      {remaining === 0 && (
        <h2>Клики в секунду: {calculateCps()}</h2>
      )}
      <button onClick={() => {
        setCount(0);
        setRemaining(0);
        setActive(false);
        setTime('');
      }} className="reset-button">
        Сброс
      </button>
    </div>
  );
};

export default ClickerApp;
