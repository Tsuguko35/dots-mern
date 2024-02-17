import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function DateTime() {
    const [dateTime, setDateTime] = useState(dayjs().format('MMM D, YYYY h:mm A'));

    useEffect(() => {
      const intervalId = setInterval(() => {
        setDateTime(dayjs().format('MMM D, YYYY h:mm A'));
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return dateTime;
}

export default DateTime;