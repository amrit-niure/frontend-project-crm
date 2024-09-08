
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Out</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Are you sure you want to sign out? This will log you out of your account.
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Sign Out</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}