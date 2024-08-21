export const renderError = (formik, field) => {
  console.log(formik, field);
  return formik?.touched[field] && formik?.errors[field] ? (
    <span className="text-xs text-red-500">*{formik?.errors[field]}</span>
  ) : null;
};
