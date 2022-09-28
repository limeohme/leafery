import { get, ref, set } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createUserHandle = (handle: string, userData: object) => {
  return set(ref(db, `users/${handle}`), userData);
};
export const getUserByHandle = (handle: string) => {
  return get(ref(db, `users/${handle}`));
};

export function getLoggedUser() {
  return localStorage.getItem('userInfo') || '';
}

export function updateUserInfo(newInfo: string) {
  localStorage.setItem('userInfo', JSON.stringify(newInfo));
};

export function removeUserFromStorage() {
  localStorage.removeItem('userInfo');
}

  