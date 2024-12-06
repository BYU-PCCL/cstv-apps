import { css } from "@emotion/react";

// TODO: Remove these dev styles

export const pageWrapperStyle = css`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const pageWidthStyle = css`
  width: 100%;
  height: 100%;

  @media (min-width: 600px) {
    width: 600px;
  }
`;

export const fixedFooterStyle = css`
  position: fixed;
  bottom: 0;

  @media (max-width: 600px) {
    left: 0;
    right: 0;
  }

  @media (min-width: 600px) {
    width: 600px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: rgba(0, 30, 76, 0.25) 0 5px 5px;
  }
`;

export const headerStyle = css`
  height: 64px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #f7faff;
  border-bottom: 2px solid #b4bfd2;
  gap: 12px;
`;

export const titleStyle = css`
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #001e4c;
`;

export const controlsContainerStyle = css`
  // Height of more experiences button
  margin-bottom: 64px;
`;

export const footerStyle = css`
  height: 64px;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  transition: background 100ms ease-out;
  background: #001e4c;

  &:hover {
    background: #072b6a;
  }

  &:active {
    background: #0b3379;
  }
`;

export const footerInnerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const bottomTitleStyle = css`
  font-family: "Source Code Pro", sans-serif;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #f0f6ff;
`;

// END dev styles

export const overlayStyle = css`
  z-index: 99999;
`;

export const overlayMenuWrapperStyle = css`
background-color: white;
  max-width: min(80vw, 480px);
  max-height: min(80vh, 480px);
  overflow: auto;
  padding: 1em;
  opacity: 1;
`;

export const overlayMenuStyle = css`
display: flex;
flex-flow: column;
overflow: auto;
`;

export const overlaySettingsMenuStyle = css`
display: flex;
flex-flow: column;
`
export const overlaySettingsMenuContentStyle = css`
  display: flex;
  flex-flow: column;
  overlow: auto;
`

export const overlayMenuHeaderStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const definitionListStyle = css`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: flex-start;
  gap: 0.5em;
`;

export const largeIconStyle = css`
  font-size = 80px;
`;

// keeps elements from collapsing unexpectedly
export const fullSizeStyle = css`
  width: 100%;
  height: 100%;
`;

export const storyBoxStyle = css`
  border: solid;
  border-radius: 5px;
  padding: 1em;
`;

export const thinWidgetStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
  height: 64px;
  padding: 0px;
`;

export const thickWidgetStyle = css`
  background-color: lightsalmon;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
  height: 192px;
  padding: 0px;
`;


// We are inserted within footron's
// controlsContainer which is not the
// full screen, everything else should not
// use vh
export const wrapperStyle = css`
  position: fixed;
  height: calc(100vh - 128px);
  max-height: calc(100vh - 128px);
  padding: 0;
  display: flex;
  flex-flow: column;
  width: min(100%, 600px);

  @media (min-width: 600px) {
    height: calc(100vh - 136px);
    padding: 0 0 16px 0;
  }
`;

export const dynamicUiwrapperStyle = css`
  max-height: calc(100% - 64px);
  flex: 1;
  display: flex;
  padding: 0 1em;
`;

// If this is set to flex
// all tabs are rendered in the wrapper
export const tabPanelStyle = css`
  flex: 1;
`;

export const bottomBarStyle = css`
  height: 64;
  min-height: 64px;
  display: flex;
`;

export const tabsStyle = css`
  display: flex;
  height: 64px;
  align-items: stretch;
  font: bold normal 18px "Source Code Pro", sans-serif;
  text-transform: uppercase;
  border-block: 2px #001e4c inset;

  @media (min-width: 600px) {
    border: solid #001e4c 3px;
    border-radius: 8px;
  }
`;

export const tabStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const selectedTabStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline red solid 3px;
`;

export const fullUIStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`;

export const fabStyle = css`
  float: right;
`;

export const tabUI = css`
  display: flex;
  flex-flow: column nowrap;
`;

export const topUI = css`
  flex: 1;
  display: flex;
  flex-flow: column;
  gap: 0.5em;
  overflow: auto;
`;

// Static Bottom UI

export const paginationStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5em;
  align-items: center;
  height: 32px;
  padding: 0px;
`;

export const standardBottomUiStyle = css`
  padding: 1em 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 1em;
`;

export const largeBottomUiStyle = css`
  height: 320;
  max-height: 320;
`;

export const movementComponentStyle = css`
  height: 112px;
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  justify-content: space-around;
  transition: opacity 0.5s ease-in;
`;

export const joystickStyle = css`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const helpMessageStyle = (visible: boolean) => css`
  flex: 1;
  opacity: ${visible ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
  text-align: center;
`;

export const timeComponentStyle = css`
  height: min(50%, 192px);
  display: flex;
  gap: 1em;
  align-items: stretch;
`;

export const timeSliderStyle = css`
  flex: 4;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 0;
`;

export const timeButtonsContainerStyle = css`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: center;
  gap: 0.5em;
`;
