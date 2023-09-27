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

export default function SnipNav() {
  const loginModal = useDisclosure();
  const signupModal = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Snippy</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button onPress={loginModal.onOpen}>Login</Button>
          </NavbarItem>
          <NavbarItem>
            <Button onPress={signupModal.onOpen}>Sign Up</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <LoginModal {...loginModal} />
      <SignupModal {...signupModal} />
    </>
  );
}
