// import { useState } from 'react';

import {
  // Box, HStack, VStack
  Flex,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";

function Footer() {

  return <Flex className="footer-nav">
    <Link className='link-btn' to={`/`}>TOP</Link>
    <Link className='link-btn' to={`/users`}>users</Link>
  </Flex>
}

export default Footer;
