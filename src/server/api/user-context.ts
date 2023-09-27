import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPagesServerClient,
  type User,
} from "@supabase/auth-helpers-nextjs";

export async function getUserFromContext(ctx: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<User | null> {
  const supabaseServerClient = createPagesServerClient(ctx);

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  return user;
}
