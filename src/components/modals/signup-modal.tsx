import React from "react";
import { Link } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  type useDisclosure,
  Input,
} from "@nextui-org/react";
import { Github } from "lucide-react";

export default function signupModal({
  isOpen,
  onOpenChange,
}: ReturnType<typeof useDisclosure>) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" flex flex-col gap-1 text-center">
                Create an account
              </ModalHeader>
              <ModalBody>
                <div className="text-center"></div>
                <Button color="primary" onPress={onClose}>
                  <Github size={22} />
                  Sign-up with GitHub
                </Button>
                <p className="text-center text-sm">or continnue with email</p>

                <div className="mb-6 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    className="outline-none"
                    key={"outside"}
                    type="email"
                    label="Email Address"
                    labelPlacement={"outside"}
                    placeholder="your@email.com"
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
                  />
                </div>
                <div className="mb-8 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
                  <Input
                    className="outline-none"
                    key={"outside"}
                    type="Password"
                    label="Password"
                    labelPlacement={"outside"}
                    placeholder="Password"
                    description="Type your password again."
                  />
                </div>

                <Button color="primary" onPress={onClose}>
                  Sign Up
                </Button>
                <div className="flex justify-center gap-2">
                  <p className="text-center text-sm">
                    Already have an account yet?{" "}
                  </p>
                  <Link href="#" className="text-sm" underline="hover">
                    Sign In
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
