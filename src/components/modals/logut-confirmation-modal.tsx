import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function LogoutModal({
  isOpen,
  onOpenChange,
}: ReturnType<typeof useDisclosure>) {
  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center"></ModalHeader>
              <ModalBody>
                <h2 className=" text-center text-2xl font-semibold">
                  Are you sure you want to logout?
                </h2>
              </ModalBody>
              <ModalFooter className="my-3">
                <Button
                  className="font-medium transition-background hover:bg-default-300"
                  color="default"
                  variant="flat"
                  onPress={onClose}
                >
                  No
                </Button>
                <Button
                  className="font-medium transition-background hover:border-2   hover:border-danger hover:bg-transparent "
                  color="danger"
                  variant="solid"
                  onPress={onClose}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
