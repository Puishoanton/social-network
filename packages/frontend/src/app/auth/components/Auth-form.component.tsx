'use client'
import { useAuthStore } from '@/shared/store';
import { CredentialsType } from '@/shared/types';
import { authValidationSchema } from '@/shared/validation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/use-auth-mutation.hook';

type AuthFormProps = {
  isLogin: boolean;
};

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const router = useRouter();
  const { setAuthenticated } = useAuthStore()
  const { login, register } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(isLogin);

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = async (values: CredentialsType) => {
    const mutation = isLoggingIn ? login : register;
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(isLoggingIn ? 'Logged in successfully!' : 'Registered successfully!');
        setAuthenticated(true)
        router.push('/feed');
      },
      onError: (error) => {
        toast.error(error.message || 'Something went wrong');
        console.log('Login error:', error);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">{isLoggingIn ? 'Login' : 'Register'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={authValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {isLoggingIn ? 'Login' : 'Register'}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLoggingIn(!isLoggingIn)}
              className="text-blue-500 hover:underline"
            >
              {isLoggingIn ? 'Don’t have an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthForm;
