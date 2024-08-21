import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
          placeholder="First Name"
          type="text"
          className="rounded-full p-6"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {renderError('firstName')}
      </div>
      <div>
        <Input
          disabled={user?.profileSetup}
          placeholder="Last Name"
          type="text"
          className="rounded-full p-6"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {renderError('lastName')}
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
      {user?.profileSetup ? null : (
        <Button disabled={isDisabled} type="submit" className="rounded-full p-6 w-full">
          {isDisabled ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Submit
        </Button>
      )}
    </div>
  );
};

export default React.memo(ProfileDetails);
