import React from "react";
import { loginImage, victorySvg } from "@/assets";
import { useFormik } from "formik";
import { useState } from "react";
// import { Loader2 } from "@/components/ui/icons"; // Ensure this import is correct for your loader component
import ProfileInputs from "./profileInputs";
import { userProfileValidation } from "../../../validation/profile.validation.js";
import { useDispatch, useSelector } from "react-redux";
import { authAsyncThunk } from "@/redux/asyncThunk/auth.asyncThunk";
import showToast from "../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { updateProfileReducer } from "@/redux/slice/auth.slice";
import { routeConfig } from "@/routes/routes";
import { objectToFormData } from "../../../utils/formData";
const Profile = () => {
  const BASE_URL = import.meta.env.VITE_STATIC_IMAGE_BASE_URL;
  const { user } = useSelector((state) => state.auth);
  console.log();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const [userProfile, setUserProfile] = useState({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    avatar: "",
  });
  const handleSubmit = (values) => {
    const formData = objectToFormData(values);
    // Log FormData keys and values
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    dispatch(authAsyncThunk.createProfileAsyncThunk(formData))
      .unwrap()
      .then((res) => {
        dispatch(updateProfileReducer(res));
        showToast("success", "Profile successfully created", "Success");
        navigate(routeConfig.chat);
      })
      .catch((err) => {
        showToast("error", err?.message, "error");
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  const formik = useFormik({
    initialValues: userProfile,
    validationSchema: userProfileValidation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center overflow-auto">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          {user?.profileSetup ? null : (
            <div className="flex items-center justify-center flex-col">
              <div className="flex items-center justify-center">
                <h1 className="text-5xl font-bold md:text-6xl">WelCome</h1>
                <img
                  className="h-[100px]"
                  alt="victory"
                  loading="lazy"
                  src={victorySvg}
                ></img>
              </div>
              <p className="font-medium text-center">
                Complete your profile to explore the app
              </p>
            </div>
          )}

          <div className="ml-10 w-full">
            <form onSubmit={formik.handleSubmit}>
              <ProfileInputs formik={formik} isDisabled={isDisabled} />
            </form>
          </div>
        </div>
        {user?.avatar && (
          <div className="hidden xl:flex justify-center items-center">
            <img
              className="w-80 h-80 rounded-full object-cover"
              src={`${BASE_URL}${user.avatar}`}
            ></img>
          </div>
        )}
      </div>
    </div>
  );
};
export default React.memo(Profile);
