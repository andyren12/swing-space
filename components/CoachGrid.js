import { Grid, Image } from "@chakra-ui/react";
import React from "react";

export default function CoachGrid() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap="16" my="20">
      {items.map((item) => (
        <Image
          key={item}
          fallbackSrc="/person.png"
          alt="Coach"
          boxSize="12rem"
          rounded="20%"
          bg="gray.200"
          objectFit="cover"
        />
      ))}
    </Grid>
  );
}
