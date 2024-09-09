"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import FormError from "@/app/components/form-error";
import { useSearchParams } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type resetInput = z.infer<typeof resetSchema>;

export default function Component() {
  const tokenParam = useSearchParams();
  const token = tokenParam.get("token");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<resetInput>({
    resolver: zodResolver(resetSchema),
  });

  const resetPassword = async (data: resetInput) => {
    const response = await axios.put(
      `http://localhost:3000/auth/reset-password?token=${token}`,
      {
        newPassword: data.password,
      }
    );
    return response.data;
  };
  const mutation: UseMutationResult<any, Error, resetInput> = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: { message: string }) => {
      console.log(data);
      toast({
        title: "Reset Successful!",
        description: `${data.message}`,
      });
      reset();
      router.push("/auth/signin");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occurred",
      });
    },
  });
  const { isPending, mutate } = mutation;

  const onSubmit: SubmitHandler<resetInput> = (data) => {
    mutate(data);
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter a new password for your account.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">New Password</Label>
            </div>
            <div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  required
                  {...register("password")}
                />
                <Button
                  variant={"ghost"}
                  size="icon"
                  type="button"
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
              {errors.password && <FormError error={errors.password.message} />}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmPassword")}
              required
            />
            {errors.confirmPassword && (
              <FormError error={errors.confirmPassword.message} />
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
