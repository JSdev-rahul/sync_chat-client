import React from 'react';
import { IoMdRefresh } from 'react-icons/io';

import { FriendRequestTabs, FriendRequestType } from '@/constant';
import { useFriendListRequestContext } from '@/context/PageContext';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import * as Tabs from '@radix-ui/react-tabs';

import FriendRequestList from './friendRequestList';

const FriendRequestPopover = React.memo(() => {
  const {
    isLoading,
    friendRequestFilters,
    refetchFriendRequests,
    friendsRequests,
    setFriendRequestFilters,
  } = useFriendListRequestContext();

  const handleTabChange = tabType => {
    return setFriendRequestFilters({
      ...friendRequestFilters,
      status:
        tabType == FriendRequestType.PENDING
          ? FriendRequestType.PENDING
          : FriendRequestType.DECLINED,
    });
  };


  return (
    <Popover.Root className="w-96 h-12 z-20">
      <Popover.Trigger asChild>
        <div className="relative">
          <button
            onClick={() => refetchFriendRequests()}
            aria-label="Update dimensions"
            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg hover:underline underline-offset-2 shadow-sm"
          >
            New Request
          </button>

          {friendsRequests?.length >= 1 && (
            <span className="absolute top-3 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Portal className="z-50">
        <Popover.Content
          className="rounded p-5 w-96 h-90 overflow-auto bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-start gap-6 items-center text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
              <div>All Friend List</div>
              <div
                className={`text-xl cursor-pointer ${isLoading ? 'animate-spin' : ''}`}
                onClick={() => refetchFriendRequests()}
              >
                <IoMdRefresh />
              </div>
            </div>
            <Tabs.Root className="flex flex-col w-full" defaultValue={FriendRequestType.PENDING}>
              <Tabs.List
                className="shrink-0 flex border-b border-mauve6"
                aria-label="Manage your account"
              >
                {FriendRequestTabs?.map(item => {
                  return (
                    <Tabs.Trigger
                      onClick={() => handleTabChange(item.status)}
                      className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                      value={item.status}
                    >
                      {item.label}
                      {friendRequestFilters.status == item.status && (
                        <span class="inline-flex items-center ml-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-red-500 text-white">
                          {friendsRequests?.length}
                        </span>
                      )}
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>
              <Tabs.Content
                className="grow py-1 bg-white rounded-b-md outline-none "
                value={friendRequestFilters.status}
              >
                <FriendRequestList />
              </Tabs.Content>
            </Tabs.Root>
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 hover:scale-125 cursor-pointer"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});

export default React.memo(FriendRequestPopover);
