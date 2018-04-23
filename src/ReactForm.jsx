import React from 'react';
import { Form, Text, Radio, RadioGroup, Select, Checkbox } from 'react-form';
import { keyGenerator, saveBlockData } from './EncryptionUtil';

class Reactform extends React.Component {

render() {
  const prev = this.props.prevhash;
  const statusOptions = [
    {
      label: 'Single',
      value: 'single',
    },
    {
      label: 'In a Relationship',
      value: 'relationship',
    },
    {
      label: "It's Complicated",
      value: 'complicated',
    },
  ]

return (
<Form onSubmit = {
  (submittedValues) => {
    debugger;
    const data = Object.assign({});
      data.prevHash = this.props.prevhash;
      data.patientData = submittedValues;
      const timeStamp = Date.now();
      data.timeStamp = timeStamp;
      const currentHash = keyGenerator(data);
      data.hash = currentHash;
      const saveResponse = saveBlockData(data);
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
          <Text field="BILL" id="BILL" />
        <br />
        <button type="submit" className="mb-4 btn btn-primary">
          Submit
        </button>
      </form>
    )}
  </Form>
);
}
}
export default Reactform;
