import {atom} from "recoil";
import { Timestamp } from "@firebase/firestore";

export interface Community {
  id: string;
  creatorID: string;
  numberOfMembers: number;
  privateType: 'public' | 'restricted' | 'private';
  createdAt?: Timestamp;
  imageURL?: string;
}