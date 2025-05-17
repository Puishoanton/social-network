import { authService } from '@/shared/service/auth.service';
import { CredentialsType } from '@/shared/types';
import { useMutation } from '@tanstack/react-query';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: async (credentials: CredentialsType) => {
      const formData = new FormData()
      formData.append('email', credentials.email,)
      formData.append('password', credentials.password,)
      const response = await authService.login(formData)

      return response;
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: CredentialsType) => {
      const formData = new FormData()
      formData.append('email', credentials.email,)
      formData.append('password', credentials.password,)
      const response = await authService.register(formData)

      return response;
    }
  });
  const logutMutation = useMutation({
    mutationFn: async () => {
      const response = await authService.logout()

      return response;
    }
  });

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logutMutation
  };
};
