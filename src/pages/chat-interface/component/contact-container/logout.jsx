import { CiLogout } from 'react-icons/ci';
import { useDispatch } from 'react-redux';

import { useUserDetails } from '@/hooks/useUserDetails';
import { authAsyncThunk } from '@/redux/asyncThunk/auth.asyncThunk';
import { handleLogoutReducer } from '@/redux/slice/auth.slice';

export const Logout = () => {
  const { user } = useUserDetails();
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(authAsyncThunk.logOutAsyncThunk({ userId: user?._id }));
        setTimeout(() => {
          dispatch(handleLogoutReducer());
        }, 100);
      }}
      className="text-white text-xl flex items-center gap-3 absolute bottom-9  left-[100px] cursor-pointer"
    >
      <CiLogout />
      Logout
    </div>
  );
};
