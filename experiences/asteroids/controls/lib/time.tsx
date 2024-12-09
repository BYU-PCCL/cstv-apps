import { Button, Slider, Box } from "@material-ui/core";
import { useMessaging } from "@footron/controls-client";
import { useEffect, useState } from "react";
import {
  helpMessageStyle,
  timeButtonsContainerStyle,
  timeComponentStyle as timeComponentStyle,
  timeSliderStyle,
} from "./style";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function formatTime(seconds: number): string {
  const units = [
    { label: "month", value: 60 * 60 * 24 * 30.5 },
    { label: "week", value: 60 * 60 * 24 * 7 },
    { label: "day", value: 60 * 60 * 24 },
    { label: "hour", value: 60 * 60 },
    { label: "minute", value: 60 },
  ];

  let timeStr = "",
    secondsRemaining = true;
  timeStr += seconds < 0 ? "-" : "";
  seconds = Math.abs(seconds);

  for (const unit of units) {
    const unitValue = Math.floor(seconds / unit.value);
    if (unitValue > 0) {
      timeStr += `${unitValue} ${unit.label}${unitValue > 1 ? "s" : ""} `;
      secondsRemaining = false;
      break;
    }
  }
  timeStr = timeStr.trim();
  timeStr += secondsRemaining ? Math.round(seconds * 10) / 10 + " seconds" : "";
  timeStr += " / second";
  return timeStr;
}

const sliderScale = 90 / 100;
const fiveDays = Math.log2(60 * 60 * 24 * 5 + 1) / sliderScale;
const live = Math.log2(2) / sliderScale;
const pause = 0;

function calculateValue(value: number) {
  return Math.sign(value) * (2 ** Math.abs(value * sliderScale) - 1);
}

export default function TimeSlider() {
  const [helpMessage, setHelpMessage] = useState(true);
  const [rateMessage, setRateMessage] = useState(false);
  const [rate, setRate] = useState(fiveDays);
  const [oldRate, setOldRate] = useState(fiveDays);
  const { sendMessage } = useMessaging();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHelpMessage(false);
    }, 6000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: number;
    if (rateMessage) {
      console.log("SHOW")
      timer = setTimeout(() => {
        setRateMessage(false);
        console.log("RESET")
      }, 3000); // Adjust time as needed
    }

    return () => clearTimeout(timer);
  }, [rateMessage]);

  const updateTime = (event: any, value: any) => {
    setHelpMessage(false);
    setRate(value);
    setRateMessage(true)
    sendMessage({ type: "time", value: calculateValue(value) });
  };

  const goLive = async () => {
    setRate(live);
    setRateMessage(true)
    sendMessage({ type: "time", value: "live" });
  };

  const play = async () => {
    setRate(oldRate);
    setRateMessage(true)
    sendMessage({ type: "time", value: calculateValue(oldRate) });
  };

  const pauseTime = async () => {
    setOldRate(rate);
    setRate(0);
    setRateMessage(true)
    sendMessage({ type: "time", value: pause });
  };

  return (
    <Box css>
      <Box css={timeComponentStyle}>
        <Box css={timeSliderStyle}>
          <Box css={helpMessageStyle(helpMessage)}>
            <b>Change the speed of time</b>
          </Box>
          <Slider
            defaultValue={18.7}
            min={-25}
            max={25}
            value={rate}
            step={0.01}
            onChange={(e, v) => updateTime(e, v)}
          />
          <Box css={helpMessageStyle(rateMessage)}>{formatTime(calculateValue(rate))}</Box>
        </Box>
        <Box css={timeButtonsContainerStyle}>
          <Button
            variant="contained"
            color="primary"
            onClick={rate == 0 ? play : pauseTime}
            size="large"
          >
            {rate == 0 ? <PlayArrowIcon /> : <PauseIcon />}
          </Button>
          <Button
            onClick={goLive}
            variant="contained"
            color="primary"
            size="large"
          >
            Live
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
