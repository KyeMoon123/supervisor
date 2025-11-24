import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, type ReactNode } from "react";
const { useSession, signIn } = createAuthClient();

type UserWithWorkspace = NonNullable<Session>["user"] & {
  workspaceId: string;
};

type Session = Awaited<ReturnType<typeof useSession>>["data"];
type AuthContextType = {
  session: Session | null;
  user: UserWithWorkspace | null;
  isPending: boolean;
  error: Error | null;
  refetch: () => Promise<Session | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending, error, refetch } = useSession();
  const router = useRouter();
  useEffect(() => {
    if ((!isPending && !data) || error) {
      router.push("/login");
    }
  }, [isPending, data, error]);

  return (
    <AuthContext.Provider
      value={{
        session: data ?? null,
        user: data?.user as UserWithWorkspace | null,
        isPending,
        error,
        refetch: async () => {
          await refetch();
          return data ?? null;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
