/**
 * Created by horacio on 3/27/16.
 */
import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

export default class PopUp extends React.Component {
  constructor(props) { // los pop ups generales se ven en todas las pantallas (no solo juego) y estan centrados en el medio
    super(props);
    this.props = props;
    this.state = {
      open: this.props.open
    };
    this.options = {autoOpen: false, close: this.handleClose, ...this.props.addiotionalOptions};
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render = () => {
    const {title, actions, children} = this.props;
    return <div className="ui-dialog">
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          {actions.map((action, index) => {
            return <Button key={index} onClick={() => {
              action.close && this.handleClose();
              action.onClick();
            }} color={action.color || 'primary'} autoFocus>
              {action.label}
            </Button>;
          })}
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>;
  }

}