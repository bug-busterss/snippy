import { Button } from "@nextui-org/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Github } from "lucide-react";
import toast from "react-hot-toast";

export function GithubLoginButton() {
  const supabaseClient = useSupabaseClient();

  async function loginWithGithub() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      toast.error(error.message);
      throw error;
    }
  }
  return (
    <Button color="primary" onPress={loginWithGithub}>
      <Github size={22} />
      Login with GitHub
    </Button>
  );
}
