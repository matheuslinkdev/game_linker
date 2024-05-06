import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalCarousel from "../ModalCarousel";
import Rating from "../Fragments/Rating";

const GameModal = ({ targetGame }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor="blue.800"
        color="common.100"
        _hover={{ bgColor: "blue.900" }}
      >
        See More
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent height="auto" w="800px" bgColor="blue.400">
          {" "}
          <ModalHeader color="common.900">{targetGame.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalCarousel game={targetGame} />
            <Rating rating={targetGame.rating} />
            {targetGame.genres.map((genre) => (
              <Tag m="0 2px" bgColor="blue.900" color="common.100" mt={2}>
                {genre.name}
              </Tag>
            ))}
            <Flex flexDir="column" mt={2}>
              <Heading size="md">Available in:</Heading>
              <Flex flexDir="row" flexWrap="wrap" gap="5px">
                {targetGame.parent_platforms.map((platform) => (
                  <Tag m="0 2px" bgColor="blue.900" color="common.100" mt={2}>
                    {platform.platform.name}
                  </Tag>
                ))}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              color="common.100"
              bgColor="#a70d0d"
              _hover={{ bgColor: "red.800" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameModal;
