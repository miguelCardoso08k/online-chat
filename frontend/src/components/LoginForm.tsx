import { loginSchema, UserLoginInput, UserLoginResponse } from "@/schemas/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { User } from "@/api/api";
import Cookie from "js-cookie";
import { useUserContext } from "@/hooks/useContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const { setUser } = useUserContext();
  const form = useForm<UserLoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserLoginInput) => {
    setError("");
    const res = await User.login(data);
    const { token, user } = res as UserLoginResponse;

    setUser(user);
    Cookie.set("token", token, { expires: 1, secure: true });

    navigate("/chat");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-2 transition delay-150 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-purple-600"
          >
            Entrar
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Form>

      <div className="text-center text-sm">
        <p>
          Não tem uma conta?{" "}
          <Link to="/auth/signup" className="text-purple-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </>
  );
}
