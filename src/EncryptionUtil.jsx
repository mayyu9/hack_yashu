
import axios from 'axios';

var SHA256 = require("crypto-js/sha256");

/* encrypt the hash value using AES 256 algorithm */
export function encryption(data, timeStamp) {
    const encryptValue = SHA256(JSON.stringify(data));
    return encryptValue;
  }

export function keyGenerator(data) {
  const timeStamp = Date.now(); /* Generate random secrete key */
  const encryptedKey = encryption(data, timeStamp);
  return encryptedKey;
}

// export function saveBlockData(data) {
//   return blockMapService(data).then(response => {
//     response
//   }).catch(error => {
//     throw(error);
//   });
// }
//
// export function blockMapService(data) {
// return new Promise((resolve, reject) => {
//   setTimeout(() => {
//     axios.get('http://10.171.228.49:8080/BlockManager/rest/BlockManager/retrieve')
//     .then(function(response){
//       return response.data
//     })
//     resolve();
//   }, 0);
// });
// }

export function saveBlockData(data) {
  debugger;
  return new Promise((resolve, reject) => {
  axios.post('http://10.171.228.49:8080/BlockManager/rest/BlockManager/create',
    {data: JSON.stringify(data)},
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )
  .then(response => {
    resolve(response.data)
  })
})
}

export function loadBlockData(data) {
  debugger;
  return new Promise((resolve, reject) => {
  axios.get('http://10.171.228.49:8080/BlockManager/rest/BlockManager/retrieve')
  .then(response => {
    resolve(response.data)
  })
})
}
