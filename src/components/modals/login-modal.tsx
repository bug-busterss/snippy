import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  type useDisclosure,
  Input,
  Link,
} from "@nextui-org/react";
import { Github } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface LoginModalProps extends ReturnType<typeof useDisclosure> {
  openSignUpModal: VoidFunction;
}

export default function LoginModal({
  isOpen,
  onOpenChange,
  openSignUpModal,
}: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabaseClient = useSupabaseClient();

  async function handleSubmit() {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      throw error;
    } else {
      toast.success(`Succesfully logged in as ${data.user.email}`);
      await router.push("/snips");
    }
  }

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={async (e) => {
                try {
                  e.preventDefault();
                  await handleSubmit();
                  onClose();
                } catch {}
              }}
            >
              <ModalHeader className=" flex flex-col gap-1 text-center">
                Sign in to your account
              </ModalHeader>
              <ModalBody>
                <div className="text-center"></div>
                <Button color="primary" onPress={onClose}>
                  <Github size={22} />
                  Sign in with GitHub
                </Button>
                <p className="text-center text-sm">or continue with email</p>

                <div className="mb-6 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    className="outline-none"
                    key={"outside"}
                    type="email"
                    label="Email Address"
                    labelPlacement={"outside"}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    className="outline-none"
                    key={"outside"}
                    type="Password"
                    label="Password"
                    labelPlacement={"outside"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Link href="#" className="text-sm" underline="hover">
                  Forgot Password?
                </Link>
                <Button
                  type="submit"
                  className="bg-primary-400"
                  isLoading={loading}
                >
                  Sign In
                </Button>
                <div className="flex justify-center gap-2">
                  <p className="text-center text-sm">
                    Do you have an account yet?
                  </p>
                  <Link
                    color="primary"
                    className="cursor-pointer text-sm"
                    underline="hover"
                    onPress={() => {
                      onClose();
                      openSignUpModal();
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter />
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
