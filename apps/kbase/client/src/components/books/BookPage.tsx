import Header from "../nav/Header";
import {
  Box, VStack
  // HStack,
} from "@chakra-ui/react";
import { BookApi } from "../../api/bookApi";
import { useEffect, useState } from "react";
import { BookGraph } from "../../data/bookData";
import { Link } from "react-router-dom";

function Book() {
  const [bookData, setBookData] = useState<BookGraph>()
  const bookName = 'negotiation'

  useEffect(() => {
    BookApi.getBook(bookName).then((data) => {
      setBookData(data)
      console.log('bookData', data)
    })
  }, [setBookData])

  const nodes = bookData?.nodes
  const nodeItems = nodes?.map((node: any) => {
    return (
      <Box key={node.id}>
        <Link to={`/nodes/${bookName}/${node.id}`}>{node.id}: {node.label}</Link>
      </Box>
    )
  })

  return (
    <Box className="page">
      <Header />
      <Box className='section'>
        <h2>Book: {bookName}</h2>
        <h3>Nodes:</h3>
        {nodeItems}
      </Box>

    </Box>
  )
}

export default Book;
