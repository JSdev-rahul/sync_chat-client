import { useEffect, useState } from "react";
import PopoverDemo from "./popOver";
import { useDispatch, useSelector } from "react-redux";
import { friendRequestAsyncThunk } from "@/redux/asyncThunk/friendRequest.asyncThunk";
import showToast from "../../../../../utils/toaster";

const FriendRequestPage = () => {
  const [isLoading, setIsLoading] = useState("");
  const [friendsRequest, setFriendRequest] = useState([]);
  const { user } = useSelector((state) => state?.auth);
  const [params, setParams] = useState({
    status: "pending",
  });
  const userId = user?._id;
  const dispatch = useDispatch();

  const fetchMyFriendRequests = () => {
    setIsLoading(true);
    dispatch(friendRequestAsyncThunk.fetchFriendRequest({ userId, params }))
      .unwrap()
      .then((res) => {
        setFriendRequest(res.data);
        showToast(
          "success", // or 'info' based on your design
          "Successfull",
          "Friend requests fetched successfully!"
        );
      })
      .catch((err) => {
        console.log("error", err); // Log error for debugging
        showToast({
          type: "error", // or 'info' based on your design
          message: "Failed to fetch friend requests. Please try again.",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  };
  useEffect(() => {
    fetchMyFriendRequests();
  }, [params]);

  const updateFriendRequestStatus = (id) => {
    dispatch(
      friendRequestAsyncThunk.updateFriendRequestStatus({
        friendRequestId: id,
        status: "decline",
      })
    )
      .unwrap()
      .then((res) => {
        showToast("success", "sucess", "success");
        fetchMyFriendRequests();
      })
      .catch((err) => {
        console.log("err",err);
      });
  };

  return (
    <>
      <PopoverDemo
        isLoading={isLoading}
        friendsRequest={friendsRequest}
        status={params.status}
        setParams={setParams}
        fetchMyFriendRequests={fetchMyFriendRequests}
        updateFriendRequestStatus={updateFriendRequestStatus}
      />
    </>
  );
};

export default FriendRequestPage;
