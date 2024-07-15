import { Flex } from '@chakra-ui/react'
import React from 'react'
import GameCard from '../Fragments/GameCard';

const GameListBox = ({games}) => {
  return (
    <Flex
      flexWrap="wrap"
      gap="20px"
      justifyContent="center"
      alignItems="center"
      mt={20}
      w="95dvw"
      margin="5dvh auto"
    >
        <GameCard games={games}/>
    </Flex>
  );
}

export default GameListBox