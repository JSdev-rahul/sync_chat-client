import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormType } from '@/constant';

import AuthForm from './authForm';

export const AuthTabs = ({ formik, isDisabled, setCurrentFormType, currentFormType }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Tabs className="w-3/4" defaultValue={FormType.LOGIN}>
        <TabsList className="bg-transparent rounded-none w-full">
          <TabsTrigger
            onClick={() => setCurrentFormType(FormType.LOGIN)}
            className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
            value={FormType.LOGIN}
          >
            {FormType.LOGIN}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setCurrentFormType(FormType.SIGN_UP)}
            className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
            value={FormType.SIGN_UP}
          >
            {FormType.SIGN_UP}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={FormType.LOGIN}>
          <AuthForm formik={formik} currentFormType={currentFormType} isDisabled={isDisabled} />
        </TabsContent>
        <TabsContent value={FormType.SIGN_UP}>
          <AuthForm formik={formik} currentFormType={currentFormType} isDisabled={isDisabled} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
