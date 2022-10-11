import { get, ref, set } from 'firebase/database';
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


export const getLeaves = async (username: string): Promise<never[]> => {
  try {
    const leaves = await get(ref(db, `leaves/${username}`));
    return leaves.exists()? Object.values(leaves.val()) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};