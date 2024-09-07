import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="mx-auto max-w-sm space-y-6 px-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to receive a password reset link.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="signin" className="underline" prefetch={false}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
