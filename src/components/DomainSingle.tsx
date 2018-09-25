import * as React from 'react';
import ControlledDomain from '../models/ControlledDomain';

import '../style/DomainSingle.scss';

interface Props {
  domain: ControlledDomain
  index: number
  updateDomain: (domain: ControlledDomain, i: number) => void
  removeDomain: (i: number) => void
}

interface State {
  domain: ControlledDomain
  changed: any
}

export default class DomainSingle extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      domain: JSON.parse(JSON.stringify(this.props.domain)), // create local copy of domain object
      changed: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, prop) {
    e.preventDefault();
    let domain = this.state.domain;
    let changed = false;
    domain[prop] = e.target.value;

    if (e.target.value != this.props.domain[prop]) {
      changed = true;
    }
    this.setState({domain, changed});
  }

  render() {
    return (
      <div className={'domain-single ' + (this.state.changed ? 'changed' : '')}>
        <input type="text" value={this.state.domain.domain} disabled={false} onChange={e => this.handleChange(e, 'domain')}/>
        <button onClick={(e) => this.props.updateDomain(this.props.domain, this.props.index)} value="edit">Update</button>
        <button onClick={(e) => this.props.removeDomain(this.props.index)} value="remove">remove</button>
      </div>
    );
  }
}