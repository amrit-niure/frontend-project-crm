import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function VerifyEmail() {
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
          <form className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input id="code" type="text" placeholder="Enter code" maxLength={6} pattern="[0-9]*" required />
            </div>
            <Button type="submit" className="w-full">
              Verify Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}