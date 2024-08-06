import { loginImage, victorySvg } from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AuthForm from "./authForm";
import ApiClient from "../../../utils/api-client";
import API_ENDPOINT from "../../../utils/api-constants";
import { useFormik } from "formik";
import {
  loginValidation,
  signUpVlidation,
} from "../../../validation/auth.validation";
import showToast from "../../../utils/toaster";
import { useDispatch } from "react-redux";
import { authAsyncThunk } from "@/redux/asyncThunk/auth.asyncThunk";
import { useNavigate } from "react-router-dom";
import { routeConfig } from "@/routes/routes";
const Auth = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [formType, setFormType] = useState("LogIn");
  const [isDisabled, setIsDisabled] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (values, formType) => {
    const dispatchType =
      formType === "LogIn"
        ? authAsyncThunk.loginAsyncThunk
        : authAsyncThunk.signUpAsyncThunk;
    const successMessage =
      formType === "LogIn"
        ? "The user has been logged in successfully."
        : "The user has been created successfully.";
    dispatch(dispatchType(values))
      .unwrap()
      .then((res) => {

        setIsDisabled(false);
        showToast("success", successMessage, "Success");
        if(res.data.profileSetup){
          navigate(routeConfig.chat)
        }else{
          navigate(routeConfig.profile)
        }
        
      })
      .catch((err) => {
        setIsDisabled(false);
        const message = err.message || errorMessage;
        showToast("error", message, "Error");
      });
  };
  const formik = useFormik({
    validationSchema: formType == "LogIn" ? loginValidation : signUpVlidation,
    initialValues: userCredentials,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values, formType);
    },
  });

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
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
              Fill in the details to get started with best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  onClick={() => setFormType("LogIn")}
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="login"
                >
                  LogIn
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setFormType("SignUp")}
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="signup"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AuthForm
                  formik={formik}
                  formType={formType}
                  isDisabled={isDisabled}
                />
              </TabsContent>
              <TabsContent value="signup">
                <AuthForm
                  formik={formik}
                  formType={formType}
                  isDisabled={isDisabled}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={loginImage}></img>
        </div>
      </div>
    </div>
  );
};
export default Auth;
