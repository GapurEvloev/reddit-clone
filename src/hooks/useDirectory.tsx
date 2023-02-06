import { useRouter } from 'next/router';
import React from 'react';
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from '../atoms/directoryMenuAtom';

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router.push(menuItem.link);
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  React.useEffect(() => {
    const {currentCommunity} = communityStateValue;

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500"
        },
      }));
    }
  }, [communityStateValue.currentCommunity]);


  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};

export default useDirectory;