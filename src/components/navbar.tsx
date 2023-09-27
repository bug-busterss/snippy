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
import LogoutModal from "./modals/logut-confirmation-modal";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function SnipNav() {
  const router = useRouter();
  const user = useUser();
  const loginModal = useDisclosure();
  const signupModal = useDisclosure();
  const logoutModal = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Snippy</p>
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
                  onPress={() => {
                    // TODO Redirect to user profile page by anyone
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
