import React from 'react';
import './App.css';
import { Form, Text, Radio, RadioGroup } from 'react-form';
import { keyGenerator, saveBlockData, loadBlockData } from './EncryptionUtil';

const {Provider, connect} = ReactRedux;
const {createStore, applyMiddleware} = Redux;
const createSagaMiddleware = ReduxSaga.default;
const {takeLatest} = ReduxSaga;
const {put, call} = ReduxSaga.effects;

// Reducer
const initialState = {
  patientData: [],
  loading: false,
  error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_DOG_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// Action Creators
const requestDog = () => {
  return { type: 'REQUESTED_DOG' }
};

const requestDogSuccess = (data) => {
  return { type: 'REQUESTED_DOG_SUCCEEDED', url: data.message }
};

const requestDogError = () => {
  return { type: 'REQUESTED_DOG_FAILED' }
};

const fetchDog = () => {
  return { type: 'FETCHED_DOG' }
};

// hack

const loadBlock = () => {
  return { type: 'LOAD_BLOCK' }
}

const loadRequestSuccess = (data) => {
  return { type: 'LOAD_SUCCEEDED', patientData: data.message }
};

const loadError = () => {
  return { type: 'LOAD_FAILED' }
};





// Sagas
function* watchFetchDog() {
  yield takeEvery('FETCHED_DOG', fetchDogAsync);
}

function* fetchDogAsync() {
  try {
    yield put(requestDog());
    const data = yield call(() => {
      return fetch('https://dog.ceo/api/breeds/image/random')
              .then(res => res.json())
      }
    );
    yield put(requestDogSuccess(data));
  } catch (error) {
    yield put(requestDogError());
  }
}

// Component
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
              const patData = this.props.patientData;
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

// export default App;

// Store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchFetchDog);

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
