import {
  Box,
  Button,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CreateSubscriptionButton = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreateSubscription = async () => {
    const subscription = await axios.post(
      `${process.env.SERVER_URI}subscribe/create`,
      {
        id: session?.user._id.toString(),
        name,
        cost: price * 100,
      }
    );
  };
  return (
    <Box>
      <Button onClick={onOpen}>Create Subscription</Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Subscription</ModalHeader>
          <ModalCloseButton />
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Subscription Name"
          />
          <Input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Subscription Price"
          />
          <Button onClick={handleCreateSubscription}>
            Create a Subscription
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateSubscriptionButton;
