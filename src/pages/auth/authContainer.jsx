import React from 'react';

import { loginImage } from '@/assets';
import { FormType } from '@/constant';

const AuthContainer = ({ children }) => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">{children}</div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={loginImage} alt={FormType.LOGIN}></img>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthContainer);
