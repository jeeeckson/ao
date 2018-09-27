import * as PIXI from "pixi.js";
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createPalette from '@material-ui/core/styles/createPalette';
import {red, deepPurple, indigo} from '@material-ui/core/colors';

import Settings from "./storage/settings";
import UIManager from "./ui/uimanager";
import AssetManager from "./assets/assetmanager";
import withRoot from "./withRoot";
import setupAudio from "./setupAudio";
import './lib/lodash';
import './lib/stacktrace';
import './utils/log';
import './detect';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif;',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  themeName: 'Dark Theme',
  palette: createPalette({
    type: 'dark',
    primary: deepPurple,
    secondary: indigo,
    error: red
  })
});

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.pixi_cnt = null;

    let settings, assetManager;
    settings = new Settings();
    assetManager = new AssetManager();
    let completed = this.setup(assetManager, settings);

    this.state = {
      completed: completed,
      settings: settings,
      assetManager: assetManager,
      app: new PIXI.Application({width: 600, height: 600, transparent: false})
    }
  }

  updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element;
    //now we are adding the application to the DOM element which we got from the Ref.
    if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
      this.pixi_cnt.appendChild(this.state.app.view);
      //The setup function is a custom function that we created to add the sprites. We will this below
      this.setup();
    }
  };

  setup = (assetManager, settings) => {
    setupAudio(assetManager.audio, settings);

    return assetManager.preload(
      (percentajeLoading) => {
        this.setState({percentajeLoading: percentajeLoading});
      });
  };

  render() {
    const {app, percentajeLoading, assetManager, settings, completed} = this.state;
    if (!assetManager) return <div/>;
    return (
      <MuiThemeProvider theme={theme}>
        <div ref={this.updatePixiCnt}>
          <UIManager
            app={app}
            start={(cb) => this.setState({cb})}
            assetManager={assetManager}
            load={completed ? 100 : percentajeLoading}
            settings={settings}/>
        </div>
      </MuiThemeProvider>);
  }
}

const styles = theme => ({
  root: {
    textAlign: 'center !important',
    paddingTop: theme.spacing.unit * 2
  },
  progress: {}
});

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Main));