import React, { Component } from 'react';
import './App.css';
import ReactForm from './ReactForm';

const PrevHash = (props) => {
  return(
    <form>
      <label>
        Previous Hash:
        <input type="text" name="name"  value={props.prevhash} />
      </label>
      <input type="submit" value="Submit" />
  </form>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevHash: 0,
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Patient Registration Form</h1>
        <div className='previous'>
        <PrevHash prevhash = { this.state.prevHash } />
        </div>
        <hr />
        <div className='form'>
        <ReactForm prevhash = { this.state.prevHash } />
        </div>
      </div>
    );
  }
}

export default App;
