import React from "react";
import { Community } from "../atoms/communitiesAtom";
import { postState } from "../atoms/postsAtom";
import { useRecoilState } from "recoil";

const usePosts = (communityData?: Community) => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async () => {};

  return {
    postStateValue,
    setPostStateValue,

  }
};

export default usePosts;