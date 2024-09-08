"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import FormError from "@/app/components/form-error";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster"

// const emailVerificationSchema = z.object({
//   verificationCode: z.string()
//     .length(6, "Code should be exactly 6 digits") // Ensures the string is exactly 6 characters long
//     .regex(/^\d+$/, "Code should be numeric") // Ensures the string contains only digits
//     .transform(val => parseInt(val, 10)) // Converts the string to a number
// });

const emailVerificationSchema = z.object({
  verificationCode: z.number().int().min(100000, "Code should be exactly 6 digits").max(999999, "Code should be exactly 6 digits"),
});


type IType = z.infer<typeof emailVerificationSchema>;


export default function VerifyEmail() {

  const { toast } = useToast();
  const router = useRouter();
  
const {
  register,
  reset,
  handleSubmit,
  formState: { errors },
} = useForm<IType>({
  resolver: zodResolver(emailVerificationSchema),
});

const sendVerificationCode = async (data: IType) => {
  const response = await axios.post("http://localhost:3000/auth/verify-email", data);
  return response.data;
};

const mutation: UseMutationResult<any, Error, IType> = useMutation({
  mutationFn: sendVerificationCode,
  onSuccess: (data: { message: string}) => {
    console.log(data)
    toast({
      title: "Sign up successful!",
      description:`${data.message}`,
    });
    reset();
    router.push('/auth/signin')
  },
  onError: (error: any) => {
    toast({
      title: "Error",
      description: error?.response?.data?.message || "An error occurred",
    });
  },
});
const {isPending, mutate} = mutation;

const onSubmit: SubmitHandler<IType> = (data) => {
  mutate(data);
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            We've sent a verification code to your email address. Enter the code below to confirm your identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input 
              id="code" 
              type="text" 
              placeholder="Enter code"
              maxLength={6}  
              minLength={6} 
              pattern="[0-9]*" 
              required 
              {...register("verificationCode", { valueAsNumber: true })}
              />
              {errors.verificationCode && <FormError error={errors.verificationCode.message} />}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Verify Email
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}