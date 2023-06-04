"use client";

import { useRouter } from "next/navigation";
import "./globals.css";
import { Box, Button, VStack } from "@chakra-ui/react";
import CoachGrid from "@/components/CoachGrid";

export default function Home() {
  const { push } = useRouter();

  return (
    <VStack spacing="20">
      <VStack
        spacing="8"
        direction="column"
        height="30rem"
        width="100%"
        bg="gray.200"
        align="center"
        justify="center"
      >
        <Box fontStyle="italic">Cool Slogan</Box>
        <Button
          rounded="full"
          bg="black"
          color="white"
          _hover={{ bg: "gray.800", transform: "scale(1.1)" }}
          onClick={() => push("/signup")}
        >
          Get Started
        </Button>
      </VStack>
      <CoachGrid />
      <Button rounded="full" onClick={() => push("/coaches")}>
        View Coaches
      </Button>
    </VStack>
  );
}
