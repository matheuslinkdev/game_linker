import { Flex } from '@chakra-ui/react'
import GameCard from '../Fragments/GameCard';
import { GameProps } from '../../types/globalTypes';

type Props ={
  games: GameProps[]
}

const GameListBox = ({games}: Props) => {
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