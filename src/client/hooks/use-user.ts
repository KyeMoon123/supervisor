// "use client";
import { createAuthClient } from "better-auth/react";
const { useSession, signOut } = createAuthClient();

// export default function useUser() {
//   const {
//     data: session,
//     isPending, //loading state
//     error, //error object
//     refetch, //refetch the session
//   } = useSession();
//   return {
//     session,
//     isPending,
//     error,
//     refetch,
//   };
// }
