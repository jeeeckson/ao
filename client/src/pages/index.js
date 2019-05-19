import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createPalette from '@material-ui/core/styles/createPalette';
import {red, deepPurple, indigo} from '@material-ui/core/colors';
import withRoot from '../withRoot';
import './../../css/main.css';
import AssetManager from '../assets/assetmanager';
import UIManager from '../ui/uimanager';
import Settings from '../storage/settings';
import '../utils/log';
import '../detect';


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

const styles = theme => ({
  root: {
    textAlign: 'center !important',
    paddingTop: theme.spacing.unit * 2
  },
  progress: {}
});

class Index extends React.Component {
  constructor() {
    super();
    let settings, assetManager;
    settings = new Settings();
    assetManager = new AssetManager();
    let completed = this.initiate(assetManager, settings);

    this.state = {
      completed: completed,
      settings: settings,
      assetManager: assetManager
    };
  }

  setFinish = () => {
    this.setState({percentajeLoading: 100});
  };

  initiate = (assetManager, settings) => {
    setupAudio(assetManager.audio, settings);

    return assetManager.preload(
      (percentajeLoading) => {
        this.setState({percentajeLoading: percentajeLoading});
      });
  };

  render() {
    const {percentajeLoading, assetManager, settings, completed} = this.state;
    if (!assetManager) return <div/>;
    return (
      <MuiThemeProvider theme={theme}>
        <UIManager
          start={(cb) => this.setState({cb})}
          assetManager={assetManager}
          load={completed ? 100 : percentajeLoading}
          settings={settings}/>
      </MuiThemeProvider>);

  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
