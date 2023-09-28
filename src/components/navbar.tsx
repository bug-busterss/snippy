import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import LoginModal from "./modals/login-modal";
import SignupModal from "./modals/signup-modal";
import LogoutModal from "./modals/logout-confirmation-modal";
import { useRouter } from "next/router";
import { useUserMetadata } from "@/hooks/use-user-metadata";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

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
            as={Link}
            href="/"
            className="bg-transparent text-2xl font-bold text-inherit"
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
                <Dropdown backdrop="blur">
                  <DropdownTrigger>
                    <Button variant="ghost">My Profile</Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem
                      key="copy"
                      onPress={async () => await router.push("/profile")}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      key="new"
                      onPress={async () => await router.push("/profile/edit")}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onPress={logoutModal.onOpen}
                    >
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          )}
          <NavbarItem>
            <Button
              as={"a"}
              href="https://github.com/bug-busterss/snippy"
              target="_blank"
            >
              <GithubIcon />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <LoginModal {...loginModal} openSignUpModal={signupModal.onOpen} />
      <SignupModal {...signupModal} openLoginModal={loginModal.onOpen} />
      <LogoutModal {...logoutModal} />
    </>
  );
}
