import * as React from 'react';
import * as ControlledDomain from '../models/ControlledDomain';

interface Props {
  domains: any[]
}

export default class DomainList extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="domainList">
        <ul>
          {this.props.domains.map((domain, i) => {
            return <li key={i} className="domain">{domain.domain}</li>
          }, this)}
        </ul>
      </div>
    )
  }
}