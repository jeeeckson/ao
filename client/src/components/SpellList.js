import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  }
});
class SpellList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * TODO
   $('#botonMoverHechizoArriba').click(() => {
      let slot = this.game.gameUI.interfaz.getSelectedSlotHechizo();
      if (!slot || slot === 1) {
        return;
      }
      this.game.client.sendMoveSpell(true, slot);
      this.game.swapSlotHechizos(slot, slot - 1);
      this.setSelectedSlotHechizo(slot - 1);
    });

   $('#botonMoverHechizoAbajo').click(() => {
      let slot = this.game.gameUI.interfaz.getSelectedSlotHechizo();
      if (!slot) {
        return;
      }
      this.game.client.sendMoveSpell(false, slot);
      this.game.swapSlotHechizos(slot, slot + 1);
      this.setSelectedSlotHechizo(slot + 1);
    });
   */

  renderSpellsItems = () => {
    const {spells} = this.props;
    return spells.map(item => {
      return <ListItem button onClick={this.handleClick(item.slot)}>
        {item.icon && <ListItemIcon>
          {item.icon}
        </ListItemIcon>}
        <ListItemText inset primary={item.name}/>
      </ListItem>
    });
  };
  handleClick = (slot) => {
    const {throwSpell} = this.props;
    throwSpell(slot);
  };

  render = () => {
    return <List
      component="nav"
      subheader={<ListSubheader component="div">Spells</ListSubheader>}
    >
      {this.renderSpellsItems()}
    </List>
  }
}
export default withStyles(styles)(SpellList);