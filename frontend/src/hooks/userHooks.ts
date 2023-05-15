import { apiClient } from '@/components/apiClient';
import { useMutation } from '@tanstack/react-query';
import { UserInfo } from '@/types/UserInfo';

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      (
        await apiClient.post<UserInfo>('/api/users/signin', {
          email,
          password,
        })
      ).data,
  });