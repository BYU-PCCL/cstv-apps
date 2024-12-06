/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler, useState } from "react";
import { useMessaging } from "@footron/controls-client";
import { Box, createTheme } from "@material-ui/core";

import { Backdrop } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import FlyTo from "./flyTo";
import SettingsMenu from "./SettingsMenu";
import AsteroidWatch from "./AsteroidWatch";
import Learn from "./Learn";
import Info from "./Info";
import {
  dynamicUiwrapperStyle,
  overlayMenuWrapperStyle,
  overlayStyle,
  selectedTabStyle,
  tabPanelStyle,
  tabsStyle,
  tabStyle,
  wrapperStyle,
} from "./style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabProps {
  children?: React.ReactNode;
  onClick: MouseEventHandler;
  selected: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      css={tabPanelStyle}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

const ControlsComponent = (): JSX.Element => {
  const { sendMessage } = useMessaging();
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState(2);

  const handleOpenSettings = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickAwaySettings = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setMenuOpen(false);
  };

  const getWatch = () => {
    setValue(1);
    sendMessage({ type: "context", value: "watch" });
  };

  const getFly = () => {
    setValue(2);
    sendMessage({ type: "context", value: "fly" });
  };

  const getLearn = () => {
    setValue(3);
    sendMessage({ type: "context", value: "learn" });
  };

  const getInfo = () => {
    setValue(4);
  };

  function Tab(props: TabProps) {
    const { children, onClick, selected, ...other } = props;

    return (
      <Box
        css={selected ? selectedTabStyle : tabStyle}
        onClick={onClick}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box css={wrapperStyle}>
      {/* Settings overlay */}
      {menuOpen ? (
        <Backdrop open={true} css={overlayStyle}>
          <ClickAwayListener onClickAway={handleClickAwaySettings}>
            <Box css={overlayMenuWrapperStyle}>
              <SettingsMenu
                toggle={menuOpen}
                onToggle={handleOpenSettings}
              />
            </Box>
          </ClickAwayListener>
        </Backdrop>
      ) : null}
      <Box css={dynamicUiwrapperStyle}>
        <CustomTabPanel value={value} index={1}>
          <AsteroidWatch />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <FlyTo />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Learn />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Info />
        </CustomTabPanel>
      </Box>
      <Box css={tabsStyle}>
        <Tab selected={false} onClick={handleOpenSettings}>
          {menuOpen ? <CloseIcon /> : <SettingsIcon />}
        </Tab>
        <Tab selected={value == 1} onClick={getWatch}>
          Watch
        </Tab>
        <Tab selected={value == 2} onClick={getFly}>
          Fly
        </Tab>
        <Tab selected={value == 3} onClick={getLearn}>
          Learn
        </Tab>
        <Tab selected={value == 4} onClick={getInfo}>
          Info
        </Tab>
      </Box>
    </Box>
  );
};

export default ControlsComponent;
