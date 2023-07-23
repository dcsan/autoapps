import Header from "../nav/Header";
import {
  Box, VStack
  // HStack,
} from "@chakra-ui/react";
import { BookApi } from "../../api/bookApi";
import { useEffect, useState } from "react";
import { BookEdge, BookGraph, BookNode } from "../../data/bookData";
import { Link, useParams } from "react-router-dom";

function NodePage() {
  const [bookData, setBookData] = useState<BookGraph>()
  const [nodeData, setNodeData] = useState<BookNode>()
  const [linkData, setLinkData] = useState<BookEdge[]>()

  const bookname = 'graph'
  const { nodeId } = useParams<string>();


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
      const label = link.id
      return (
        <Box key={index}>
          <Link to={`/nodes/${bookname}/${target}`}> type {link.type} ➡ {label} </Link>
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
      </Box>
    )
  }

  return (
    <Box className="page">
      <Header />
      <Box className='section'>
        <h2>Node [{nodeData?.label}]</h2>
        {nodeItem()}
        <h3>Links {linkData?.length}</h3>
        {nodeLinks('from')}
      </Box>

    </Box>
  )
}

export default NodePage;
