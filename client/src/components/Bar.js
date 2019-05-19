import React from 'react';
import style from 'styled-components';

const BarComponent = style.div`
  width: ${props => props.percentage }%
`;
export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.props = props;
  }

  getDerivedStateFromProps = (props, state) => {
    this.setState({...props});
    this._updateBar();
  };

  _updateBar = () => {
    const {quantity, maxQuantity, noInverse, max} = this.state;
    let percentage = 100;
    if (max) {
      if (noInverse) {
        percentage = Math.floor((quantity / maxQuantity) * 100);
      } else {
        percentage = 100 - Math.floor((quantity / maxQuantity) * 100);
      }
    }
    this.setState({label: quantity + '/' + maxQuantity, percentage});
  };

  render = () => {
    const {percentage, label} = this.state;

    return <div>
      <div>{label}</div>
      <BarComponent percentage={percentage}/>
    </div>;
  }
}