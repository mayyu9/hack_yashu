import React from 'react';

const PatientData = (props) => {
  return (
    <div>
       <br />
    <hr />
      <br />
      <label> Name: {props.patData.patientData.name} </label>
        <br />
      <label> Gender: {props.patData.patientData.gender} </label>
         <br />
      <label> Fin: {props.patData.patientData.fin} </label>
        <br />
      <label> Bill: {props.patData.patientData.bill} </label>
      <br />

    </div>
  );
}

export default PatientData;
