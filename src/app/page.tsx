import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('Server Session' ,session);
  if (session && session.user) {
    return (
      <div className="h-[100vh] flex items-center justify-center gap-2 flex-col">
       <span> Hi, <b>{session.user.name}</b></span>
       <span>You are now<b> logged in </b>.</span>
        <Link href={"/api/auth/signout"}>
          <Button>Sign out</Button>
        </Link>
        <Link href={"/dashboard"}>
        <Button variant={"ghost"}>Go to Dashboard </Button>
      </Link>
      </div>
    );
  }
  return (
    <div className="h-[100vh] flex items-center justify-center gap-8 flex-col">
      <div className="flex gap-8">
        <Link href={"/api/auth/signin"}>
          <Button>Sign In</Button>
        </Link>
        <Link href={"/auth/signup"}>
          <Button variant={"outline"}>Sign Up</Button>
        </Link>
      </div>
      <Link href={"/dashboard"}>
        <Button variant={"ghost"}>Go to Dashboard </Button>
      </Link>
    </div>
  );
}
