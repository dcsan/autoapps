import Header from "../nav/Header";
import {
  Box, VStack
  // HStack,
} from "@chakra-ui/react";
import { BookApi } from "../../api/bookApi";
import { useEffect, useState } from "react";
import { BookGraph, BookNode } from "../../data/bookData";
import { Link, useParams } from "react-router-dom";

function NodePage() {
  const [bookData, setBookData] = useState<BookGraph>()
  const [nodeData, setNodeData] = useState<BookNode>()

  const bookname = 'negotiation'
  const { nodeId } = useParams<string>();


  useEffect(() => {
    BookApi.getNode(bookname, nodeId).then((data) => {
      setNodeData(data!)
      console.log('bookData', data)
    })
  }, [setBookData, nodeId])

  function nodeLinks() {
    const links = nodeData?.links?.map((link) => {
      return (
        <Box key={link}>
          <Link to={`/nodes/${bookname}/${link}`}>{link} </Link>
        </Box>
      )
    })
    return (
      <Box>{links}</Box>
    )
  }

  const nodeItem = () => {
    return (
      <Box key={nodeData?.id}>
        <Box>id: {nodeData?.id}</Box>
        <Box>label: {nodeData?.label}</Box>
        <Box>text: {nodeData?.text}</Box>
        <Box>keywords: {nodeData?.keywords}</Box>
        <Box>
          {nodeLinks()}
        </Box>
      </Box>
    )
  }

  return (
    <Box className="page">
      <Header />
      <Box className='section'>
        <h2>Node [{nodeData?.label}]</h2>
        {nodeItem()}
      </Box>

    </Box>
  )
}

export default NodePage;
