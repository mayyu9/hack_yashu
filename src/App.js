import React from 'react';
import './App.css';
import { Form, Text, Radio, RadioGroup } from 'react-form';
import { keyGenerator, saveBlockData, loadBlockData } from './EncryptionUtil';

import PatientData from './PatientData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevHash: 0,
      patientData: [],
    }
    this.OnChange = this.OnChange.bind(this);
  }

  OnChange (event){
    this.setState({ prevHash: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Patient Form</h1>
        <div className='previous'>
          <label> Previous Hash:   </label>
            <input type="text" name="preHash"  value={this.state.prevHash} onChange={this.OnChange}/>
        </div>

        <hr />

        <div className='form'>
          <Form onLoad = { () => {
            const loadData = loadBlockData();
            if(loadData > 0){
              const patData = this.state.patientData;
              patData.push(loadData);
            }
          }}
          onSubmit = {
            (submittedValues) => {
                const data = Object.assign({});
                data.prevHash = this.state.prevHash;
                data.patientData = submittedValues;
                const timeStamp = Date.now();
                data.timeStamp = timeStamp;
                const currentHash = keyGenerator(data);
                data.hash = currentHash;
                const saveResponse = saveBlockData(data);
                 if(saveResponse) {
                  const patData = this.state.patientData;
                  patData.push(data);
                  this.setState({ patientData: patData, prevHash: currentHash });
                 }
           }
            }>
              {formApi => (
                <form onSubmit={formApi.submitForm} id="form2">
                  <label htmlFor="firstName">Name</label>
                    <Text field="name" id="name"/>
                  <RadioGroup field="gender">
                    <label htmlFor="male" className="mr-2">Male</label>
                    <Radio value="male" id="male" className="mr-3 d-inline-block" />
                    <label htmlFor="female" className="mr-2">Female</label>
                    <Radio value="female" id="female" className="d-inline-block" />
                  </RadioGroup>
                  <label htmlFor="FIN">FIN</label>
                    <Text field="fin" id="fin" />
                  <br/ >
                  <label htmlFor="BILL">Bill Amount</label>
                    <Text field="bill" id="bill" />
                  <br />
                  <button type="submit" className="mb-4 btn btn-primary">
                    Submit
                  </button>
                </form>
              )}
            </Form>
        </div>

      <div className='previous'>
        <label> Block Information </label>
            <br />
         { this.state.patientData.map((patientData) => {
            return (
              <PatientData
                patData= { patientData }
                hash = {this.state.prevHash}
              />
            )
          })
         }
      </div>

    </div>
    );
  }
}

export default App;
