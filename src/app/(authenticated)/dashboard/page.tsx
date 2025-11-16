"use client";
import { useAuth } from "@/client/context/AuthContext";

export default function DashboardPage() {
  const { session, isPending, error, refetch } = useAuth();
  return <div>{JSON.stringify(session)}</div>;
}
