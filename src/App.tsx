import "./App.css";

import Icon from "./assets/Icon";
import { useEffect, useMemo, useRef, useState } from "react";

const defaultTimer = { minutes: 0, seconds: 0 };

function App() {
  const [data, setData] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const secondsEvent = useRef<NodeJS.Timeout | null>(null);
  const dataCount = useRef(0);
  const [timer, setTimer] = useState(defaultTimer);

  const [paused, setPaused] = useState(false);

  const timerFunc = () => {
    return setInterval(() => {
      setTimer(prev => {
        if (prev.seconds === 59) {
          return { minutes: prev.minutes + 1, seconds: 0 };
        }
        return { minutes: prev.minutes, seconds: prev.seconds + 1 };
      });
    }, 1000);
  };

  const timerVal = useMemo(() => {
    return (
      String(timer.minutes).padStart(2, "0") +
      ":" +
      String(timer.seconds).padStart(2, "0")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.seconds, timer.minutes]);

  const stopFn = () => {
    if (secondsEvent.current) clearInterval(secondsEvent.current);
    setTimer(defaultTimer);
  };

  const playFn = () => {
    if (paused) {
      if (secondsEvent.current) clearInterval(secondsEvent.current);

      setPaused(false);
    } else {
      secondsEvent.current = timerFunc();
      setPaused(true);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch("https://picsum.photos/1024/1024");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setData(prev => {
        dataCount.current = prev.length;
        return [...prev, url];
      });
      console.log(data.length, index, data.length - index < 10);
      if (dataCount.current - index < 20) {
        await fetchImage();
      }
    };

    fetchImage();
  }, [index]);

  return (
    <div className="container">
      <div className="timer">
        <h3>{timerVal}</h3>
        <div className="timer-func">
          <button onClick={playFn}>
            <Icon name="playPause" width={28} height={28} fill="currentColor" />
          </button>
          <button onClick={stopFn}>
            <Icon name="stop" width={28} height={28} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className="game">
        <div className="game-img">
          <img src={data[index]} />
        </div>
      </div>
      <footer>
        <div>
          <button>Previous</button>
          <button onClick={() => setIndex(index + 1)}>Next</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
