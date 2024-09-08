"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient({});

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children} 
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
