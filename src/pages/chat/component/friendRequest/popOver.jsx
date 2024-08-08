import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as Tabs from "@radix-ui/react-tabs";
import { RxCross2 } from "react-icons/rx";
import { FcCheckmark } from "react-icons/fc";
import { IoMdRefresh } from "react-icons/io";
import FriendRequestList from "./friendList";

const PopoverDemo = React.memo(
  ({
    friendsRequest,
    status,
    setParams,
    isLoading,
    fetchMyFriendRequests,
    updateFriendRequestStatus,
    acceptFriendRequest,
  }) => {
    return (
      <Popover.Root className="w-96 h-12">
        <Popover.Trigger asChild>
          <button
            onClick={() => fetchMyFriendRequests()}
            aria-label="Update dimensions"
            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          >
            New Request
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="rounded p-5 w-96 h-90 overflow-auto bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-start gap-6 items-center text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                <div>All Friend List</div>
                <div
                  className={`text-xl cursor-pointer ${
                    isLoading ? "animate-spin" : ""
                  }`}
                  onClick={() => fetchMyFriendRequests()}
                >
                  <IoMdRefresh />
                </div>
              </div>
              <Tabs.Root
                className="flex flex-col w-full"
                defaultValue="pending"
              >
                <Tabs.List
                  className="shrink-0 flex border-b border-mauve6"
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger
                    onClick={() => {
                      status !== "pending"
                        ? setParams({ ...setParams, status: "pending" })
                        : null;
                    }}
                    className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                    value="pending"
                  >
                    Pending{" "}
                    {status == "pending" && (
                      <span class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-red-500 text-white">
                        {friendsRequest?.length}
                      </span>
                    )}
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    onClick={() => {
                      status !== "decline"
                        ? setParams({ ...setParams, status: "decline" })
                        : null;
                    }}
                    className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                    value="decline"
                  >
                    Decline{" "}
                    {status == "decline" && (
                      <span class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-red-500 text-white">
                        {friendsRequest?.length}
                      </span>
                    )}
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content
                  className="grow py-1 bg-white rounded-b-md outline-none "
                  value="pending"
                >
                  <FriendRequestList
                    acceptFriendRequest={acceptFriendRequest}
                    friendsRequest={friendsRequest}
                    updateFriendRequestStatus={updateFriendRequestStatus}
                    type="pending"
                  />
                </Tabs.Content>
                <Tabs.Content
                  className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                  value="decline"
                >
                  <FriendRequestList
                    type="decline"
                    acceptFriendRequest={acceptFriendRequest}
                    friendsRequest={friendsRequest}
                    updateFriendRequestStatus={updateFriendRequestStatus}
                  />
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
  }
);

export default React.memo(PopoverDemo);
