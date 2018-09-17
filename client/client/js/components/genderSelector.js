import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Enums from './../enums';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class GenderSelector extends React.Component {
  state = {
    value: 'female'
  };

  handleChange = event => {
    this.setState({value: event.target.value});
    this.props.change(event.target.value);
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value={Enums.Genero.mujer} control={<Radio/>} label="Female"/>
            <FormControlLabel value={Enums.Genero.hombre} control={<Radio/>} label="Male"/>
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

GenderSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenderSelector);