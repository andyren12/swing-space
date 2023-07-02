import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box px="12" pt="2" position="fixed" width="100%" backgroundColor="grey">
      <Flex h="16" align="center" justify="center" position="relative">
        <HStack spacing="8" alignItems="center" position="absolute" left="2rem">
          <Box fontSize="2xl" cursor="pointer" onClick={() => push("/")}>
            LOGO
          </Box>
          <Menu isOpen={isOpen} placement="bottom" autoSelect={false} isLazy>
            <MenuButton
              as={Button}
              rounded="full"
              px="4"
              variant="unstyled"
              cursor="pointer"
              _hover={{ bg: "white" }}
              _focus={{ boxShadow: "none" }}
              display={{ base: "none", xl: "inline" }}
              onClick={onToggle}
            >
              Coach <ChevronDownIcon h="6" w="6" />
            </MenuButton>
            <MenuList textAlign="center" mx="4" onMouseLeave={onClose}>
              <MenuItem>Learn more</MenuItem>
              <MenuItem onClick={() => push("/coachsignup")}>Sign up</MenuItem>
            </MenuList>
          </Menu>
          <Button
            rounded="full"
            bg="gray.200"
            _hover={{ bg: "white" }}
            display={{ base: "none", xl: "inline" }}
          >
            About
          </Button>
        </HStack>
        <InputGroup width="30rem" justifySelf="center">
          <InputRightElement pointerEvents="none" mr="2">
            <SearchIcon h="4" w="4" color="black" />
          </InputRightElement>
          <Input
            placeholder="Find your coach"
            fontSize=".8rem"
            size="md"
            rounded="full"
            pl="6"
            bg="white"
          />
        </InputGroup>

        {session ? (
          <Flex alignItems="center" position="absolute" right="2rem">
            <Flex>
              <Menu autoSelect={false}>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                >
                  <Avatar size="sm" src={"/person.png"} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => push("/dashboard")}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => push("/messaging")}>
                    Messages
                  </MenuItem>
                  <MenuItem onClick={signOut}>
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        ) : (
          <HStack spacing="8" position="absolute" right="2rem">
            <Button
              bg="transparent"
              rounded="full"
              onClick={() => push("/login")}
            >
              Log in
            </Button>
            <Button rounded="full" onClick={() => push("/signup")}>
              Sign up
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
