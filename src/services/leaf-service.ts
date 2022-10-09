import { ref, set } from 'firebase/database';
import { db } from '../config/firebase-config';

interface ILeaf {
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
}

export const createLeaf = (leaf: ILeaf) => {
  set(ref(db, `leaves/${leaf.author}/${leaf.id}`), leaf);
};