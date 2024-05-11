import { Flex, Heading, Icon, List, ListItem } from "@chakra-ui/react";
import {
  AiOutlineUserAdd,
  AiFillBackward,
  AiOutlineMenu,
} from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Flex
      w="100%"
      h="10dvh"
      bg="pink.600"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      position="absolute"
      top={0}
      zIndex={9999999}
    >
      <Icon
        as={sidebarOpen ? AiFillBackward : AiOutlineMenu}
        fontSize={32}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        cursor="pointer"
        color="pink.950"
      />

      <Flex
        position="absolute"
        left={0}
        top="10dvh"
        bg="pink.700"
        w={300}
        h="90dvh"
        borderRadius="0 0 10px 0"
        zIndex={999}
        transition="all 0.3s ease-in-out"
        transform={sidebarOpen ? "translateX(0)" : "translateX(-100%)"}
      >
        {sidebarOpen && (
          <>
            <Link to="/">Home</Link>
            <Link to="/genres">Genres</Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
