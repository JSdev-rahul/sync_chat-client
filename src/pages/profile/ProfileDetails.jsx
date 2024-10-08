import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BUTTON_LABELS } from '@/constant';
import { useUserDetails } from '@/hooks/useUserDetails';

const ProfileDetails = ({ formik, isDisabled }) => {
  const { user } = useUserDetails();

  const renderError = field => {
    return formik.touched[field] && formik.errors[field] ? (
      <span className="text-xs text-red-500">*{formik.errors[field]}</span>
    ) : null;
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    formik.setFieldValue('avatar', file);
  };

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className="">
        <Input
          disabled={user?.profileSetup}
          placeholder="Email"
          type="email"
          className="rounded-full p-6 w-full"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {renderError('email')}
      </div>
      <div>
        <Input
          disabled={user?.profileSetup}
          placeholder="userName"
          type="text"
          className="rounded-full p-6"
          id="userName"
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        {renderError('userName')}
      </div>

      <div>
        <Input
          placeholder="Avatar URL"
          type="file"
          className="rounded-full p-6"
          id="avatar"
          name="avatar"
          onChange={event => handleFileChange(event)}
          onBlur={formik.handleBlur}
        />
        {renderError('avatar')}
      </div>

      <Button disabled={isDisabled} type="submit" className="rounded-full p-6 w-full">
        {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {BUTTON_LABELS.SUBMIT}
      </Button>
    </div>
  );
};

export default React.memo(ProfileDetails);
