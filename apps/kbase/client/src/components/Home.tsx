import { Link } from "react-router-dom";
import Header from "./nav/Header";
import {
  Box, VStack
  // HStack,
} from "@chakra-ui/react";

function Home() {
  return <Box className="page">
    <Header />
    <Box className='section'>
      <h2>Navigation</h2>
      <VStack>
        <Link to='/books/negotiation' className='link-btn'>Books / Negotiation</Link>
        <Link to='/topics' className='link-btn'>Topics</Link>
      </VStack>
    </Box>

  </Box>
}

export default Home;
