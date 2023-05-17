import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store';
import { selectUserInfo } from '@/store/userSlice';

export const ProtectedRoute = () => {
  const userInfo = useAppSelector(selectUserInfo);
  if (!userInfo) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};
