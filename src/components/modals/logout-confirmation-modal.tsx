import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  type useDisclosure,
} from "@nextui-org/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function LogoutModal({
  isOpen,
  onOpenChange,
}: ReturnType<typeof useDisclosure>) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

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
                  disabled={isLoading}
                  onPress={onClose}
                >
                  No
                </Button>
                <Button
                  className="font-medium transition-background hover:border-2   hover:border-danger hover:bg-transparent "
                  color="danger"
                  variant="solid"
                  isLoading={isLoading}
                  onPress={async () => {
                    setIsLoading(true);
                    await supabaseClient.auth.signOut();
                    await router.push("/");
                    onClose();
                    setIsLoading(false);
                  }}
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
