import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { Plus } from "lucide-react";

export default function SnipNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Navbar className="" maxWidth="full">
      <NavbarBrand>
        <p className="font-bold text-inherit">Snippy</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            <Tooltip
              color="default"
              showArrow={true}
              content="Create Snip"
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
            >
              <Button color="primary" variant="flat">
                <Plus />
              </Button>
            </Tooltip>
          </Link>
        </NavbarItem> */}
        <NavbarItem className="hidden lg:flex">
          <Button>Login</Button>
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
