import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import LoginModal from "./modals/login-modal";
import SignupModal from "./modals/signup-modal";
import LogoutModal from "./modals/logout-confirmation-modal";
import { useRouter } from "next/router";
import { useUserMetadata } from "@/hooks/use-user-metadata";

export default function SnipNav() {
  const router = useRouter();
  const user = useUserMetadata();
  const loginModal = useDisclosure();
  const signupModal = useDisclosure();
  const logoutModal = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Button
            className="bg-transparent font-bold text-inherit"
            onPress={async () => {
              await router.push("/");
            }}
          >
            Snippy
          </Button>
        </NavbarBrand>
        <NavbarContent justify="end">
          {!user ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Button onPress={loginModal.onOpen}>Login</Button>
              </NavbarItem>
              <NavbarItem>
                <Button onPress={signupModal.onOpen}>Sign Up</Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button onPress={logoutModal.onOpen}>Logout</Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  onPress={async () => {
                    await router.push("/profile");
                  }}
                >
                  My Profile
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <LoginModal {...loginModal} openSignUpModal={signupModal.onOpen} />
      <SignupModal {...signupModal} openLoginModal={loginModal.onOpen} />
      <LogoutModal {...logoutModal} />
    </>
  );
}
