import * as yup from 'yup';

// Validation schema for email and password
export const loginValidation = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    // .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});




// Validation schema for email and password
export const signUpVlidation = yup.object({
    email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});


