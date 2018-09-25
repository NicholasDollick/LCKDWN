import * as React from 'react';
import ControlledDomain from '../../models/ControlledDomain';

type State = {
  domain: ControlledDomain
}
interface Props {
  addDomain: (domain: ControlledDomain) => void
}

export default class AddDomainForm extends React.Component<Props, State> {
  public readonly state: State;

  constructor(props) {
    super(props);
    this.state = {
      domain: new ControlledDomain()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, property) {
    let newState = this.state;
    newState[property] = e.target.value;

    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addDomain(this.state.domain);

    let newState = this.state;
    newState['domain'] = new ControlledDomain();

    this.setState(newState);
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="domain">Domain</label>
          <input type="text" value={this.state.domain.domain} onChange={e => {this.handleChange(e, 'domain')}} name="domain" />
        </fieldset>
        <input type="submit" value="add" />
      </form>
    )
  }
}