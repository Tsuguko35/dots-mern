import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function DateTime() {
    const [dateTime, setDateTime] = useState({date:dayjs().format('MMM D, YYYY'), time: dayjs().format('h:mm A')});

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDateTime({date:dayjs().format('MMM D, YYYY'), time: dayjs().format('h:mm A')});
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return dateTime;
}

export default DateTime;