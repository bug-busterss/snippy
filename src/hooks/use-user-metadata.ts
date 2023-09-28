import { type User } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

interface UserWithMetadata extends User {
  user_metadata: Partial<{
    avatar: string;
    name: string;
    username: string;
  }>;
}

export function useUserMetadata(): UserWithMetadata {
  return useUser() as UserWithMetadata;
}
