import { Button } from "@nextui-org/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export function GoogleLoginButton() {
  const supabaseClient = useSupabaseClient();

  async function loginWithGoogle() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      toast.error(error.message);
      throw error;
    }
  }
  return (
    <Button
      className="mb-2 bg-white font-medium text-black"
      onPress={loginWithGoogle}
    >
      <FcGoogle size={22} />
      Login with Google
    </Button>
  );
}
