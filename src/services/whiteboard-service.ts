import { get, ref, set } from 'firebase/database';
import { db } from '../config/firebase-config';

export const setWhiteboard = async (username: string, wb: any) => {
  try {
    set(ref(db, `whiteboard/${username}`), wb);
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line consistent-return
export const getWhiteboard = async (username: string) => {
  try {
    const board = await get(ref(db, `whiteboard/${username}`));
    console.log();
    return board.exists()? board.val():null; 
  } catch (err) {
    console.error(err);
  }
};

