"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/app/components/form-error";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";



enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

const signUpSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 characters long."),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.nativeEnum(ROLE),
});

type SignUpInput = z.infer<typeof signUpSchema>;

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: ROLE.USER,
    },
    resolver: zodResolver(signUpSchema),
  });

  const signUp = async (data: SignUpInput) => {
    const response = await axios.post("http://localhost:3000/auth/signup", data);
    return response.data;
  };

  const mutation: UseMutationResult<any, Error, SignUpInput> = useMutation({
    mutationFn: signUp,
    onSuccess: (data: { message: string}) => {
      console.log(data)
      toast({
        title: "Sign up successful!",
        description:`${data.message}`,
      });
      reset();
      router.push('/auth/verify-email')
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occurred",
      });
    },
  });
const {isPending, mutate} = mutation;

  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    mutate(data);
  };
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create a <b>Hamro Khata</b> account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  {...register("name")}
                />
                {errors.name && <FormError error={errors.name.message} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && <FormError error={errors.email.message} />}
              </div>
              {/* {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+61 555 5555 555"
                  required
                />
              </div>
            )} */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password")}
                    />
                    <Button
                      variant={"ghost"}
                      size="icon"
                      className="absolute bottom-1 right-1 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <FormError error={errors.password.message} />
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                Sign Up
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={"signin"} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
