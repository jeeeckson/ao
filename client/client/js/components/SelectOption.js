import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  input: {
    color: 'white'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class SelectOption extends React.Component {
  state = {
    selected: ''
  };

  handleChange = event => {
    const {onChange} = this.props;
    this.setState({selected: event.target.value});
    onChange(event.target.value);
  };

  render() {
    const {classes, options, title} = this.props;
    let newOptions = Object.keys(options);
    return (
      <div className={classes.root}>
        <FormControl>
          <InputLabel>{title}</InputLabel>
          <Select
            value={this.state.selected}
            className={classes.input}
            onChange={this.handleChange}
            input={<Input name="class" id="class"/>}
            displayEmpty
            name={title}
          >
            <MenuItem value=""/>
            {newOptions.map((name, i) => {
              return (<MenuItem key={i} value={i + 1}>{name}</MenuItem>);
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

SelectOption.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectOption);