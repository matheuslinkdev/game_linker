import { Icon, Link } from '@chakra-ui/react'
import { IoMdHome } from 'react-icons/io'

const Return = () => {
  return (
    <Link href='/' color="blue.200" pos="absolute" left={2} top={2}><Icon as={IoMdHome} fontSize={32} _hover={{color: "blue.100"}} transition=".3s ease"/></Link>
  )
}

export default Return