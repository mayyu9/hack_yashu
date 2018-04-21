import rand from 'random-key';
import { AES } from 'crypto-js';

/* encrypt the hash value using AES 256 algorithm */
export function encryption(hash) {
    console.log('encrypt: '.concat(hash));
    const message = "patient info";
    const encryptValue = AES.encrypt(message, hash);
    console.log('encryptValue: '.concat(encryptValue));
    return encryptValue;
  }
export function keyGenerator() {
  const hash = rand.generate(); /* Generate random secrete key */
  const encryptedKey = encryption(hash);
  return encryptedKey;
}
