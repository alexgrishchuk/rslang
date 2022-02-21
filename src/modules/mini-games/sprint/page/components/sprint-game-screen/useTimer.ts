/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

function useTimer(limit: number) {
  const [timer, setTimer] = useState<number>(limit);
  const [id, setId] = useState<NodeJS.Timeout | null>(null);
  const removeTimer = () => {
    clearTimeout(id as unknown as number);
  };

  const resetTimer = () => {
    setTimer(limit);
  };

  const handler = () => {
    setTimer(timer - 1);
  };

  useEffect(() => {
    if (timer) {
      setId(setTimeout(handler, 1000));
    }
    removeTimer();
  }, [timer]);

  return { timer, setTimer, resetTimer, removeTimer };
}

export default useTimer;
