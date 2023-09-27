import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import LoginModal from "./modals/login-modal";

export default function SnipNav() {
  const loginModal = useDisclosure();
  const signupModal = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex" onClick={loginModal.onOpen}>
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem onClick={signupModal.onOpen}>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <LoginModal {...loginModal} />
    </>
  );
}
