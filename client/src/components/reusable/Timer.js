import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime = 60, onTimeout }) => {
  const [time, setTime] = useState(
    localStorage.getItem('timerTime') ? parseInt(localStorage.getItem('timerTime')) : initialTime
  );
  
  const resetTimer = () => {
    localStorage.removeItem('timerTime')
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          if (onTimeout) {
            onTimeout();
            resetTimer()
          }
          return 0;
        }
        localStorage.setItem('timerTime', (prevTime - 1).toString());
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [initialTime, onTimeout]);

  return time
};

export default Timer;
