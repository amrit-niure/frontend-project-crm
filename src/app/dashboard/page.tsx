"use client"
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const {data: session} = useSession()
  return <div>Dashboard {JSON.stringify(session)}</div>;
}
