import { Box, Button, Fab } from "@material-ui/core";
import { useMessaging } from "@footron/controls-client";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";
import { fabStyle, fullSizeStyle, halfWidthStyle, largeBottomUiStyle, largeIconStyle, overflowContentStyle, smallTopUiStyle, storyBoxStyle, thinBottomWidgetStyle } from "./style";
import { useCallback, useState } from "react";
import { Close } from "@mui/icons-material";
import ZoomControls from "./zoom";
import TimeSlider from "./timeSlider";

const dummyText = ("Loading");

export default function Learn() {
  const [slideshowPlaying, setSlideShowPlaying] = useState(false);
  const [slideshowTitle, setSlideShowTitle] = useState("No title provided");
  const [progressString, setProgressString] = useState(`[0 of 0]`);
  const [showReplay, setShowReplay] = useState(false);
  const [prevSlide, setPrevSlide] = useState(false);
  const [nextSlide, setNextSlide] = useState(false);
  const [infoText, setInfoText] = useState(dummyText);
  const { sendMessage } = useMessaging((content: any) => {
    console.log("Incoming info: ", content);
    if (content.title != null) setSlideShowTitle(content.title);
    if (content.storyLength != null && content.index != null) setProgressString(`[${content.index} of ${content.storyLength}]`);
    if (content == undefined) content = { info: "Error loading info" };
    if (content.replay != null) setShowReplay(true);
    else setShowReplay(false);
    setInfoText(content.info);
    setPrevSlide(!content.prevSlideButton); // not disabled
    setNextSlide(!content.nextSlideButton);
    console.log(prevSlide, nextSlide);
  });
  const getInfoText = useCallback(
    async (value) => {
      await sendMessage({ type: "learn", value: value });
    },
    [sendMessage]
  );

  const prev = async () => {
    getInfoText("previous");
  };

  const next = async () => {
    getInfoText("next");
  };

  const first = async () => {
    getInfoText("first");
  };

  const replay = () => {
    sendMessage({ type: "learn", value: "replay" });
  };

  const close = async () => {
    setSlideShowPlaying(false);
    sendMessage({ type: "context", value: "home" });
  };

  const startShow = async (value: string) => {
    setSlideShowPlaying(true);
    getInfoText(value);
  };

  return (
    <div css={fullSizeStyle}>
      {slideshowPlaying ? (
        <Box css={fullSizeStyle}>
          <Box css={smallTopUiStyle}>
            <Fab onClick={close} size="small" color="primary" css={fabStyle}>
              <Close />
            </Fab>
            <Box>
              <h2>{slideshowTitle}</h2>
              <h6>{progressString}</h6>
              <div dangerouslySetInnerHTML={{ __html: infoText }}></div>
            </Box>
          </Box>
          <Box css={largeBottomUiStyle}>
            <Box css={thinBottomWidgetStyle}>
              {nextSlide && (
                <IconButton color="primary" onClick={first}>
                  <ReplayIcon css={largeIconStyle} />
                </IconButton>
              )}
              <Button color="primary" variant="contained" disabled={prevSlide} size="large" onClick={prev}>
                <strong>{"<"}</strong>
              </Button>
              <Button color="primary" variant="contained" disabled={nextSlide} size="large" onClick={next}>
                <strong>{">"}</strong>
              </Button>
              {showReplay && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ReplayIcon />}
                  onClick={replay}>
                  Replay Animation
                </Button>
              )}
            </Box>
            <ZoomControls />
            <TimeSlider />
          </Box>
        </Box>
      ) : (
        <Box css={overflowContentStyle}>
          <h3>Deep dives</h3>
          <p>Take a deeper dive into Asteroids with our interactive stories</p>
          <Box css={storyBoxStyle}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => startShow("asteroids-101")}
              css={halfWidthStyle}
            >
              Asteroids 101
            </Button>
            <p>What are asteroids?</p>
            <p>What does this experience show me?</p>
          </Box>
          <Box css={storyBoxStyle}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => startShow("close-approaches")}
              css={halfWidthStyle}
            >
              Close Approaches
            </Button>
            <p>What is a close approach?</p>
            <p>Are we in danger of impact?</p>
          </Box>
          <Box css={storyBoxStyle}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => startShow("missions")}
              css={halfWidthStyle}
            >
              Missions
            </Button>
            <p>Can we visit an asteroid</p>
            <p>What can missions achieve?</p>
          </Box>
        </Box>
      )}
    </div>
  );
}
