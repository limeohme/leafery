/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC63ElM7Ds57reU_0f1SnNMqSptODTZpZI',
  authDomain: 'leafery-eb25e.firebaseapp.com',
  projectId: 'leafery-eb25e',
  storageBucket: 'leafery-eb25e.appspot.com',
  messagingSenderId: '79200526637',
  appId: '1:79200526637:web:024f24d7e3925f155f33a4',
  measurementId: 'G-26V9RH92C7',
  databaseURL: 'https://leafery-eb25e-default-rtdb.europe-west1.firebasedatabase.app/'
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app); 
export const analytics = getAnalytics(app);