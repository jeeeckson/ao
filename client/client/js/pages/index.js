import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';
import './../../css/main.css';
import AssetManager from '../assets/assetmanager';
import UIManager from '../ui/uimanager';
import Settings from '../storage/settings';
import '../lib/lodash';
import '../lib/stacktrace';
import '../utils/log';
import '../detect';


function setupAudio(audio, settings) {
  audio.setSoundMuted(settings.getSoundMuted());
  audio.setMusicMuted(settings.getMusicMuted());
  audio.setMusicVolume(settings.getMusicVolume());
  audio.setSoundVolume(settings.getSoundVolume());
  audio.setMusic('intro');
}

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

    this.state = {
      completed: false,
      settings: settings,
      assetManager: assetManager
    };
    this.initiate(assetManager, settings);
  }

  progress = () => {
    const {completed} = this.state;
    if (completed === 100) {
      this.setState({completed: 0});
    } else {
      const diff = Math.random() * 10;
      this.setState({completed: Math.min(completed + diff, 100)});
    }
  };

  initiate = (assetManager, settings) => {
    const {cb} = this.state;
    setupAudio(assetManager.audio, settings);

    assetManager.preload(
      () => {
        setTimeout(() => {
          cb && cb();
        }, 800);
      },
      (percentajeLoading) => {
        this.setState({percentajeLoading: percentajeLoading});
      });
  };

  render() {
    const {percentajeLoading, assetManager, settings} = this.state;
    if (!assetManager) return <div/>;
    return (<UIManager
      start={(cb) => this.setState({cb})}
      assetManager={assetManager}
      load={percentajeLoading}
      settings={settings}/>);

  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
