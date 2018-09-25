import * as React from 'react';
import AddDomainForm from './components/forms/AddDomainForm';

import DomainList from './components/DomainList';

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
    this.setStateFromStorage = this.setStateFromStorage.bind(this);
    this.pushToStorageArray = this.pushToStorageArray.bind(this);
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
        console.log(`pushed ${value} to storage key ${key}`)
      });
    });


  }

  addDomain(value: ControlledDomain){
      this.pushToStorageArray('domains', value);
      
      let domains = this.state.domains;
      domains.push(value);
      this.setState({domains});
  }

  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <div className="body">
          <AddDomainForm addDomain={this.addDomain}/>
          <DomainList domains={this.state.domains}/>
        </div>
      </div>
    )
  }
}

export default App;