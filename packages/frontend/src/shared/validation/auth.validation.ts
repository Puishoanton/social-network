import * as Yup from 'yup';

export const authValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 6 characters').required('Required')
});
