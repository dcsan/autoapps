import Header from "../nav/Header";
import {
  Box, VStack
  // HStack,
} from "@chakra-ui/react";
import { BookApi } from "../../api/bookApi";
import { useEffect, useState } from "react";
import { BookEdge, BookGraph, BookNode } from "../../data/bookData";
import { Link, useParams } from "react-router-dom";
import { Badge } from '@chakra-ui/react'

function NodePage() {
  const [bookData, setBookData] = useState<BookGraph>()
  const [nodeData, setNodeData] = useState<BookNode>()
  const [linkData, setLinkData] = useState<BookEdge[]>()
  const { nodeId } = useParams<string>();
  const bookname = 'graph'

  useEffect(() => {
    BookApi.getNode(bookname, nodeId).then((data) => {
      setNodeData(data!)
    })
    BookApi.getLinks(bookname, nodeId).then((data) => {
      setLinkData(data!)
      console.log('linkData', data)
    })
  }, [setBookData, nodeId])

  function nodeLinks(mode: 'from' | 'to') {
    const links = linkData?.map((link: BookEdge, index: number) => {
      // const target = mode === 'from' ? link.from : link.to
      const target = link.to
      const from = link.from
      // const label = link.label || link.split(' ').slice(0, 3).join(' ')
      const label = link.id || link.label
      return (
        <Box key={index}>
          <Link to={`/nodes/${bookname}/${target}`}>
            <Badge w={150}>{link.type}</Badge>
            ➡️ {label}
          </Link>
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
        <Box className='node-text'>{nodeData?.text}</Box>
        <Box>id: {nodeData?.id}</Box>
        <Box>label: {nodeData?.label}</Box>
        <Box>keywords: {nodeData?.keywords}</Box>
      </Box>
    )
  }

  return (
    <Box className="page">
      <Header />
      <Box className='section'>
        <Box className='node-title'>
          {nodeData?.label}
        </Box>
        {nodeItem()}
        <h3>Links {linkData?.length}</h3>
        {nodeLinks('from')}
      </Box>
    </Box>
  )

}

export default NodePage;
