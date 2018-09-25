import * as React from 'react';
import AddDomainForm from './components/forms/AddDomainForm';

import DomainSingle from './components/DomainSingle';

import ControlledDomain from './models/ControlledDomain';

type State = {
  domains: ControlledDomain[]
}

class App extends React.Component<{}, State> {
  title: string;

  constructor(props) {
    super(props);
    this.state = {
      domains: []
    }
    this.title = 'LCKDWN - Domain Access Manager';

    this.addDomain = this.addDomain.bind(this);
    this.removeDomain = this.removeDomain.bind(this);
    this.updateDomain = this.updateDomain.bind(this);

    this.setStateFromStorage = this.setStateFromStorage.bind(this);
    this.pushToStorageArray = this.pushToStorageArray.bind(this);
    this.removeFromStorageArray = this.removeFromStorageArray.bind(this);
    this.updateStorageArray = this.updateStorageArray.bind(this);
  }

  componentDidMount() {
    this.setStateFromStorage('domains');
  }
  
  setStateFromStorage(key: string) {
    // set state value 'key' to the corresponding local storage value
    let newState = this.state;

    chrome.storage.local.get([key], result => {
      console.log(newState);

      if(!result[key]) {
        result[key] = [];
      }
      newState[key] = result[key];
      this.setState(newState);
    });
    
  }

  pushToStorageArray(key: string, value: any) {
    chrome.storage.local.get([key], result => {
      if(!result[key]) {
        result[key] = [];
      }
      result[key].push(value);

      chrome.storage.local.set(result, ()=> {
        console.log(`pushed ${value} to storage key ${key}`);
      });
    });
  }

  removeFromStorageArray(key: string, i: number) {
    chrome.storage.local.get([key], result => {
      result[key].splice(i,1);

      chrome.storage.local.set(result, ()=> {
        console.log(`Removed ${key}:${i} from storage`);
      });
    });
  }

  updateStorageArray(key: string, value: any, i: number) {
    chrome.storage.local.get([key], result => {
      result[key][i] = value;

      chrome.storage.local.set(result, ()=> {
        console.log(`Removed ${key}:${i} from storage`);
      });
    });
  }

  addDomain(value: ControlledDomain){
      this.pushToStorageArray('domains', value);
      
      let domains = this.state.domains;
      domains.push(value);
      this.setState({domains});
  }

  removeDomain(i: number) {
    this.removeFromStorageArray('domains', i);
    let domains = this.state.domains;
    domains.splice(i, 1);
    this.setState({domains});
  }

  updateDomain(value: ControlledDomain, i: number) {
    this.updateStorageArray('domains', value, i);
    let domains = this.state.domains;
    domains[i] = value;
    this.setState({domains});
  }

  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <div className="body">
          <AddDomainForm addDomain={this.addDomain}/>
          {(this.state.domains) ? <div className="domainList">
            <ul>
              {this.state.domains.map((domain, i) => {
                return ( 
                  <li>
                    <DomainSingle domain={domain} index={i} removeDomain={this.removeDomain} updateDomain={this.updateDomain}/>
                  </li>
                )
              }, this)}
            </ul>
          </div>:''}
        </div>
      </div>
    )
  }
}

export default App;