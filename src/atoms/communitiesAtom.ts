import {atom} from "recoil";
import { Timestamp } from "@firebase/firestore";

export interface Community {
  id: string;
  creatorID: string;
  numberOfMembers: number;
  privateType: 'public' | 'restricted' | 'private';
  createdAt?: Timestamp;
  imageURL?: string;
};

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
};

interface CommunityState {
  mySnippets: CommunitySnippet[];
  // visitedCommunities
};

const defaultCommunityState: CommunityState = {
  mySnippets: [],
}

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
})
