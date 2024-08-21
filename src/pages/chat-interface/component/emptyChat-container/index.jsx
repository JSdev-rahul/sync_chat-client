import React from 'react';

import Lottie from 'lottie-react';

import { emptyMessageLottie } from '../../../../assets';

const EmptyChatContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-gray-800 text-white">
      <div className="w-1/2 max-w-md">
        <Lottie animationData={emptyMessageLottie} loop={true} />
      </div>
      <h1 className="text-2xl font-semibold mt-8">Hi, select a contact and start the chat!</h1>
    </div>
  );
};

export default EmptyChatContainer;
