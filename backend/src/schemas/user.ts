import { z } from "zod";

export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const UserCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().regex(regexPassword).min(8),
});

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const UserUpdateSchema = z.object({
  value: z.string().min(1),
});

export const UserResponseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().nullable(),
  createdAt: z.string().date(),
});

export const UserArrayResponseSchema = z.array(UserResponseSchema);

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
