import { z } from "zod";

export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  avatarUrl: z.string().nullable(),
  createdAt: z.string().date(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O email deve ser informado")
    .email("Email inválido"),
  password: z.string().min(1, "A senha deve ser informada"),
});

export const loginResponseSchema = z.object({
  messsage: z.string(),
  user: userSchema,
  token: z.string().jwt(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "O nome deve ser informado"),
    email: z
      .string()
      .min(1, "O email deve ser informado")
      .email("Email mal informado \n template: user@example.com"),
    password: z
      .string()
      .regex(
        regexPassword,
        "A senha deve conter pelo menos 8 digitos, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 carater especial"
      ),
    passwordConfirm: z.string().min(1, "A senha deve ser confirmada"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
  });

export const updatePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string().regex(regexPassword),
  confirmPassword: z.string().regex(regexPassword),
});

export type User = z.infer<typeof userSchema>;
export type UserLoginInput = z.infer<typeof loginSchema>;
export type UserLoginResponse = z.infer<typeof loginResponseSchema>;
export type UserRegisterInput = z.infer<typeof registerSchema>;
export type UserUpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
