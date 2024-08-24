import { useSelector } from 'react-redux';

export const useUserDetails = () => {
  const { user } = useSelector(state => state.auth);
  return { user, userId: user?._id };
};
