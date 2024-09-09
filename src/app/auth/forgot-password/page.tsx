"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormError from "@/app/components/form-error";
import { Toaster } from "@/components/ui/toaster";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type emailInput = z.infer<typeof forgotSchema>;

export default function Component() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<emailInput>({
    resolver: zodResolver(forgotSchema),
  });

  const forgotPassword = async (data: emailInput) => {
    alert("Hitting")
    const response = await axios.post(
      "http://localhost:3000/auth/forgot-password",
      data
    );
    return response.data;
  };

  const mutation: UseMutationResult<any, Error, emailInput> = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data: { message: string }) => {
      toast({
        title: "Password reset Link sent!",
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

  const onSubmit: SubmitHandler<emailInput> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="mx-auto max-w-sm space-y-6 px-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to receive a password reset link.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" className="w-full" disabled={isPending}>
            Send Reset Link
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="signin" className="underline" prefetch={false}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
