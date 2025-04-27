import { User } from '@prisma/client';

export type UserReturnType = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;
export type UserReturnWithPasswordType = Omit<User, 'createdAt' | 'updatedAt'>;
