import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

const AuthForm = ({ formik, formType, isDisabled }) => {
  const renderError = (field) => {
    return formik.touched[field] && formik.errors[field] ? (
      <span className="text-xs text-red-500">*{formik.errors[field]}</span>
    ) : null;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-5 mt-10">
        <div>
          <Input
            placeholder="Email"
            type="email"
            className="rounded-full p-6"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {renderError("email")}
        </div>

        <div>
          <Input
            placeholder="Password"
            type="password"
            className="rounded-full p-6"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {renderError("password")}
        </div>

        {formType === "SignUp" && (
          <div>
            <Input
              placeholder="Confirm Password"
              type="password"
              className="rounded-full p-6"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {renderError("confirmPassword")}
          </div>
        )}

        <Button
          disabled={isDisabled}
          type="submit"
          className="rounded-full p-6 w-full"
        >
          {isDisabled ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}{" "}
          {formType}
        </Button>
      </div>
    </form>
  );
};

// AuthForm.propTypes = {
//   formik: PropTypes.object.isRequired,
//   formType: PropTypes.oneOf(['LogIn', 'SignUp']).isRequired,
// };

export default React.memo(AuthForm);
