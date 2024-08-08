import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

const FriendRequestList = ({ friendsRequest, updateFriendRequestStatus }) => {
  return friendsRequest?.map((item) => {
    console.log(("item",item));
    const { friendRequestDetails } = item;
    return (
      <div
        key={friendRequestDetails.id}
        className="flex items-center justify-between mb-4 gap-5 cursor-pointer hover:bg-gray-100 border-b-2"
      >
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black">
          <div className="text-lg font-semibold">
            {" "}
            {friendRequestDetails?.firstName[0].toUpperCase()}
            {friendRequestDetails?.lastName[0].toUpperCase()}
          </div>
        </div>
        <div>
          <div className="font-semibold">
            {friendRequestDetails?.firstName} {friendRequestDetails?.lastName}
          </div>
          <div className="text-sm text-gray-400">
            {friendRequestDetails?.lastSeen}
          </div>
          <div className="text-sm text-gray-400">
            {friendRequestDetails?.email}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="bg-white rounded-full p-1 text-white shadow-2xl hover:scale-125">
            <FcCheckmark />
          </div>

          <div
            onClick={() => updateFriendRequestStatus(item?._id)}
            className="bg-red-500 rounded-full p-1 text-white shadow-2xl hover:scale-125"
          >
            <RxCross2 />
          </div>
        </div>
      </div>
    );
  });
};

export default FriendRequestList;
