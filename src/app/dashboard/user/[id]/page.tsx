"use client"
import { BACKEND_URL } from "@/lib/constants";
import { FC } from "react";
import axios from 'axios'; 
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UserProps {
  params: {
    id: string;
  };
}

const fetchUser = async (id: string, session: any) => {

  const response = await axios.get(`${BACKEND_URL}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.tokens.access_token}`,
    },
  });

  return response.data; 
};

const User: FC<UserProps> = ({ params }) => {
  const {data: session} = useSession()
  const { id } = params;

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>  fetchUser(id, session),
  })


  
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  return (
    <div>
    <div>User: {user.name}</div>
    <div>Role: {user.role}</div>
    </div>
  );
};

export default User;
