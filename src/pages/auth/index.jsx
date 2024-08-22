// React and Hooks
import { useMemo, useState } from 'react';
// Redux and Thunks
import { useDispatch } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';

// Constants
import { FormType, ToastMessageKey } from '@/constant';
import { authAsyncThunk } from '@/redux/asyncThunk/auth.asyncThunk';
import { routeConfig } from '@/routes/routes';
import { useFormik } from 'formik';

// Utilities
import { showErrorToast, showSuccessToast } from '../../utils/toaster';
// Validation
import { loginValidation, signUpVlidation } from '../../validation/auth.validation';

import AuthContainer from './authContainer';
import { AuthHeader } from './authHeader';
import { AuthTabs } from './authTabs';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentFormType, setCurrentFormType] = useState(FormType.LOGIN);
  const [isDisabled, setIsDisabled] = useState(false);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = values => {
    setIsDisabled(true);
    const dispatchType =
      currentFormType === FormType.LOGIN
        ? authAsyncThunk.loginAsyncThunk
        : authAsyncThunk.signUpAsyncThunk;

    const successMessage =
      currentFormType === FormType.LOGIN
        ? ToastMessageKey.LOGIN_SUCCESS
        : ToastMessageKey.SIGNUP_SUCCESS;

    dispatch(dispatchType(values))
      .unwrap()
      .then(res => {
        showSuccessToast(successMessage);
        if (res.data.profileSetup) {
          navigate(routeConfig.chat);
        } else {
          navigate(routeConfig.profile);
        }
      })
      .catch(err => {
        const message = err.message || errorMessage;
        showErrorToast(message);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };
  const validation = currentFormType === FormType.LOGIN ? loginValidation : signUpVlidation;
  const formik = useFormik({
    validationSchema: validation,
    initialValues: formValues,
    enableReinitialize: true,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const authTabs = useMemo(
    () => (
      <AuthTabs
        currentFormType={currentFormType}
        setCurrentFormType={setCurrentFormType}
        formik={formik}
        isDisabled={isDisabled}
      />
    ),
    [currentFormType, formik, isDisabled],
  );

  return (
    <AuthContainer>
      <AuthHeader />
      {authTabs}
    </AuthContainer>
  );
};
export default Auth;
