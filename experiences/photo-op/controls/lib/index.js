/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, useState, useEffect } from "react";
import { useMessaging } from "@footron/controls-client";
import { Box, Button, Slider } from "@material-ui/core";

const containerStyle = css`
  padding: 16px;
  overflow-x: hidden;

  p {
    margin: 0 0 16px;
  }

  .slider {
    display:flex;
    gap:10px;
    align-items:center;
  }
`;

const ControlsComponent = () => {
    const { sendMessage } = useMessaging((message) => {
        console.log( "Got message:", message );
    });

    const handleClick = async ( val ) => {
        await sendMessage(val);
    };

    return (
            <div css={containerStyle}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        p={0}
        m={0}
      >
        <p>
          <b>Try changing to different styles!</b>
        </p>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        p={0}
        m={0}
      >
            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("flowers") }}>
            Campus Flowers
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("cloudy") }}>
            Cloudy Y
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("maeser") }}>
            Maeser Flowers
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("tmcb") }}>
            TMCB in the spring
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("valley") }}>
            Valley sunset
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("winter") }}>
            Winter campus
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("ymountain") }}>
            Y Mountain
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("ylogo") }}>
            Y Logo
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("basketball") }}>
            Marriott Center
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("congrats") }}>
            Congratulations banner
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("keyboard") }}>
            Cute keyboard
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("supercomputer") }}>
            TMCB datacenter
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("suchcongrats") }}>
            Such congratulations!
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("kungfu") }}>
            Kung Fu!
            </Button>
            </Box>

            <Box p={0.5} m={1}>
            <Button variant="contained" color="primary" onClick={() => { handleClick("thing") }}>
            You did a thing!
            </Button>
            </Box>


      </Box>

    </div>
  );
};

export default ControlsComponent;
