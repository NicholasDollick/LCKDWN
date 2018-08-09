import * as React from 'react';
import DomainAdd from './components/forms/DomainAdd';

class App extends React.Component {
  title: string;

  constructor(props) {
    super(props);
    this.title = 'LCKDWN - Domain Access Manager';

    this.addDomain = this.addDomain.bind(this);
    this.setStateFromStorage = this.setStateFromStorage.bind(this);
  }

  componentDidMount() {
    this.setStateFromStorage.call(this, ['domains']);
  }
  
  setStateFromStorage(key: string) {
    // set state value 'key' to the corresponding local storage value

    chrome.storage.local.get(key, result => {
      this.setState({
        key: result,
      });
    });
  }

  pushToStorageArray(key: string, value: any) {
    let storedObj: Object;
    chrome.storage.local.get([key], result => {storedObj = result});
    storedObj[key].push(value);

    chrome.storage.local.set(storedObj, ()=> console.log(`pushed ${value} to storage key ${key}`));
  }

  addDomain(value: any) {
      this.pushToStorageArray('domains', value);
  }

  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <div className="body">
          <DomainAdd addDomain={this.addDomain}/>
        </div>
      </div>
    )
  }
}

export default App;