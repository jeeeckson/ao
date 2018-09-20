/**
 * Created by horacio on 4/6/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import style from 'styled-components';
import Mensaje from './popups/mensaje';
import './../../css/main.css';
import Connect from '../pages/connect';
import Renderer from '../view/renderer';
import LinearProgress from '@material-ui/core/LinearProgress';
import CreateCharacter from '../pages/createCharacter';
import Button from '@material-ui/core/Button';

// Container widths
//
// Set the container width, and override it for fixed navbars in media queries.
// Border radius: Only round corners at higher resolutions if contained in a container
const Container = style.div`
  @include container-fixed;

  @media (min-width: $screen-sm-min) {
    width: $container-sm;
  }
  @media (min-width: $screen-md-min) {
    width: $container-md;
  }
  @media (min-width: $screen-lg-min) {
    width: $container-lg;
  }
  width: ${props => props.width}
  height: ${props => props.height}
  border-radius: $border-radius-large; 
  padding-left:  ($grid-gutter-width / 2);
  padding-right: ($grid-gutter-width / 2);
  
  max-width: 100%;
`;


export default class UIManager extends React.Component {

  static propTypes = {
    assetManager: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loadGameUI: null,
      loading: false,
      widthContainer: 15,
      heightContainer: 15,
      showLogin: true,
      showCreate: false,
      showPlay: false,
      openMessage: false,
      scala: null
    };
    this.props = props;
    this.props.start(this.inicializarGame);

    //en px
    this.widthMenuJuego = 154;
    this.widthJuego = 17 * 32;
    this.heightJuego = 13 * 32;
    this.FOOTER_HEIGHT = 60;
  }

  updateDimensions = () => {
    //this.setState({width: $(window).width(), height: $(window).height()});
  };
  componentWillMount = () => {
    this.resizeUi();
  };
  componentDidMount = () => {
    try {
      //document
      window.addEventListener('touchstart', () => {
      }, false);
      window.addEventListener('resize', _.throttle(() => this.resizeUi, 100));
    } catch (e) {
      console.log('error on addEventListener: ' + e.message);
    }
  };
  componentWillUnmount = () => {
    window.removeEventListener('resize', _.throttle(() => this.resizeUi, 100));
    window.removeEventListener('touchstart', () => {
    }, false);
  };

  getScale = () => {
    return this.state.scala;
  };

  center() {
    window.scrollTo(0, 1);
  }

  setLoginScreen = () => {
    const {loadGameUI} = this.state;
    this.setState({showLogin: true, showCreate: false, showPlay: false, enableButtonPlay: true});
    if (loadGameUI) {
      this.setState({hideGamePopUps: true});
      //this.gameUI.hideGamePopUps();
    }
  };

  setCrearPJScreen = () => {
    this.setState({showLogin: false, showCreate: true, showPlay: false});
  }

  setGameScreen = () => {
    this.setState({showLogin: false, showCreate: false, showPlay: true});
  }

  setFooterHiden(gameRatio, windowWidth, windowHeight) {
    windowHeight -= this.FOOTER_HEIGHT;
    if (windowHeight < 600) {
      this.setState({showFooter: false});
      return true;
    }
    this.setState({showFooter: true});
    return false;
  }

  resizeUi = () => {
    const {loadGameUI} = this.state;
    //let menuBorderWidth = parseInt($('#menuJuego').css('border-left-width')); // solo borde izq, los demas valen 0
    //let containerBorderWidth = parseInt($('#container').css('border-left-width')); // 4 bordes iguales pero hay que pasar alguno para el ancho
    //let gameWidth = this.widthMenuJuego + this.widthJuego + menuBorderWidth + containerBorderWidth * 2;
    let gameWidth = this.widthMenuJuego + this.widthJuego;
    //let gameHeight = this.heightJuego + containerBorderWidth * 2;
    let gameHeight = this.heightJuego;
    let scala = null;

    let gameRatio = gameWidth / gameHeight;

    let windowWidth = parseInt(window.innerWidth) - 10;
    let windowHeight = parseInt(window.innerHeight) - 30;
    let windowRatio = windowWidth / windowHeight;

    if (!this.setFooterHiden(gameRatio, windowWidth, windowHeight)) {
      windowHeight -= this.FOOTER_HEIGHT;
    }

    if (gameRatio > windowRatio) { // limita el width
      scala = windowWidth / gameWidth;
    } else {
      scala = windowHeight / gameHeight;
    }
    this.setState({
      widthContainer: Math.floor(scala * gameWidth),
      heightContainer: Math.floor(scala * gameHeight),
      inputChatFontSize: Math.max(14, Math.floor(12 * scala)) + 'px',
      scala
    });

    if (loadGameUI) {
      this.gameUI.resize(scala);
    }
  };

  hideIntro() {
    this.setState({loading: false});
    this.setLoginScreen();
  }

  showMensaje(mensaje) {
    this.mensaje.show(mensaje);
  }

  submit = ({username, password, race, gender, classP, head, email, city}) => {
    this.setState({showPlay: true, showCreate: false, showLogin: false ,objLogin: {username, password, race, gender, classP, head, email, city} })
  };

  //this is a start game function
  newStarGame = (username, password) => {
    this.setState({showPlay: true, showCreate: false, showLogin: false ,objLogin: {username, password} })
  };

  render = () => {
    const {load, assetManager} = this.props;
    const {widthContainer, heightContainer, showLogin, showCreate, showPlay, openMessage, objLogin, scala} = this.state;
    return (<div>
      {load < 99 && <LinearProgress
        value={load}
        size={100}
        variant="determinate"
      />}
      {widthContainer && heightContainer && <Container id="container" width={widthContainer} height={heightContainer}>
        {openMessage && <Mensaje open={openMessage}/>}
        {load > 99 && showLogin && <div>
          <Button size="large" variant="raised" onClick={this.setCrearPJScreen}>
            Create PJ
          </Button>
          <Connect onClick={this.newStarGame}/>
        </div>}
        {load > 99 && showCreate && <CreateCharacter throwDice={() => {
          this.client.sendThrowDices();
        }} cb={this.submit} assetManager={assetManager}/>}
        {load > 99 && showPlay && <Renderer objLogin={objLogin} uiManager={this} assetManager={assetManager} escala={scala}/>}
      </Container>}
    </div>);
  };

}
