// React and Hooks
import { useMemo, useState } from 'react';
// Redux and Thunks
import { useDispatch } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';

// Constants
import { FormType, ToastMessageKey } from '@/constant';
import { AuthContext } from '@/context/PageContext';
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
    userName: '',
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
      .then(() => {
        showSuccessToast(successMessage);
        navigate(routeConfig.chat);
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

  const contextValue = useMemo(() => ({
      currentFormType,
      setCurrentFormType,
      formik,
      isDisabled,
    }), [currentFormType, formik],);

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthContainer>
        <AuthHeader />
        <AuthTabs />
      </AuthContainer>
    </AuthContext.Provider>
  );
};
export default Auth;
