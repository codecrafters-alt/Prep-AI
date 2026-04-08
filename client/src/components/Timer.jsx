import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Timer({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100;
  return (
    <div className="w-20 h-20">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "28px",
          pathColor: "#34d399", // softer emerald (matches your buttons)
          textColor: "#a7f3d0", // light emerald text (clean & readable)
          trailColor: "#1e293b", // dark slate (matches your background)
        })}
      />
    </div>
  );
}

export default Timer;
