import * as yup from 'yup';

export const userProfileValidation = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  userName: yup.string().required('Required'),
  // lastName: yup.string().required('Required'),
  // avatar: yup.string().url("Invalid URL").required("Required"),
});
