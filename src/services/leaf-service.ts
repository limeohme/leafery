/* eslint-disable consistent-return */
import { get, ref, remove, set } from 'firebase/database';
import { db } from '../config/firebase-config';

export interface ILeaf {
    leaf: string | undefined;
    preview: string;
    title: string;
    author: string;
    id: string;
    likes: number;
    dislikes: number;
    comments: string[];
    public: boolean;
    createdOn: string;
    editedOn: string;
    images: boolean;
    pinned: boolean;
}

export const createLeaf = async (leaf: ILeaf) => {
  try {
    await set(ref(db, `leaves/${leaf.author}/${leaf.id}`), leaf);
    return 'Success!';
  } catch (err) {
    console.error(err);
    return 'Something went wrong. Please, try again.';
  }
};


export const getLeaves = async (username: string): Promise<ILeaf[] | []> => {
  try {
    const leaves = await get(ref(db, `leaves/${username}`));
    return leaves.exists()? Object.values(leaves.val()) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteLeaf = async (username: string, leafID: string) => {
  // eslint-disable-next-line no-restricted-globals
  if (confirm('Are you sure you want to delete this leaf?')) {
    try {
      remove(ref(db, `leaves/${username}/${leafID}`));
    } catch (err) {
      console.error(err);
    }
  }    
};

export const getLeafByID = async (username: string, id: string) => {
  try {
    const leaf = await (await get(ref(db, `leaves/${username}/${id}`))).val();
    return leaf;
  } catch (err) {
    console.error(err);
  }
};