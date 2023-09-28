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
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { GithubLoginButton, GoogleLoginButton } from "../buttons";
import { uniqueUsernameGenerator } from "unique-username-generator";

interface SignupModalProps extends ReturnType<typeof useDisclosure> {
  openLoginModal: VoidFunction;
}

export default function SignupModal({
  isOpen,
  onOpenChange,
  openLoginModal,
}: SignupModalProps) {
  const supabaseClient = useSupabaseClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please enter email and password");
      return;
    }
    setIsLoading(true);
    const username = uniqueUsernameGenerator({
      dictionaries: [[name]],
      separator: "-",
    });

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          username,
        },
      },
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      throw error;
    } else {
      toast.success(
        `Sent a confirmation email at ${data.user?.email}. Open the link to login.`,
      );
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
                Create an account
              </ModalHeader>
              <ModalBody>
                <GoogleLoginButton />
                <GithubLoginButton />
                <p className="text-center text-sm">or continue with email</p>

                <div className="mb-6 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    className="outline-none"
                    key={"outside"}
                    type="text"
                    label="Name"
                    labelPlacement={"outside"}
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

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
                    description="Password must be at least 8 characters long."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-8 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    className="outline-none"
                    key={"outside"}
                    type="Password"
                    label="Confirm Password"
                    labelPlacement={"outside"}
                    placeholder="Password"
                    description="Type your password again."
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>

                <Button
                  className="font-medium"
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  Sign Up
                </Button>
                <div className="flex justify-center gap-2">
                  <p className="text-center text-sm">
                    Already have an account yet?{" "}
                  </p>
                  <Link
                    color="primary"
                    className="cursor-pointer text-sm"
                    underline="hover"
                    onPress={() => {
                      onClose();
                      openLoginModal();
                    }}
                  >
                    Sign In
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
