import {useRef, useState} from "react";
import ResultModal        from "./ResultModal.jsx";

export function TimerChallenge({
								 title,
								 targetTime
							   }) {
  
  const timer  = useRef(0);
  const dialog = useRef(null);
  
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000
  
  if (timeRemaining <= 0) {
	clearInterval(timer.current);
	setTimeRemaining(targetTime*1000);
  }
  
  function handleStart() {
	timer.current = setInterval(() => {
	  setTimeRemaining(prevState => prevState - 10);
	}, 10);
  }
  function handleStop() {
	clearInterval(timer.current);
  }
  
  return (
	<>
	  <ResultModal ref={dialog} targetTime={targetTime} result={"lost"}/>
	  <section className={"challenge"}>
		<h2>{title}</h2>
		<p className={"challenge-time"}>
		  {targetTime} second{targetTime > 1 ? "s" : ""}
		</p>
		
		<p>
		  <button onClick={timerIsActive ? handleStop : handleStart}>
			{timerIsActive ? 'Stop' : 'Start'} Challenge
		  </button>
		</p>
		
		<p className={timerIsActive ? 'active' : undefined}>
		  {timerIsActive ? "Time is running..." : "Timer inactive"}
		</p>
	  </section>
	</>
  );
}