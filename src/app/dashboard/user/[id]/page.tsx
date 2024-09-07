import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BACKEND_URL } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface UserProps {
  params: {
    id: string;
  };
}

const User: FC<UserProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const response = await fetch(BACKEND_URL + `/user/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.tokens.access_token}`,
    },
  });
  console.log(response);
  const user = await response.json();
  console.log(user);
  return (
    <div>
      <div>User: {user.name}</div>
      <div>Role: {user.role}</div>
    </div>
  );
};

export default User;
