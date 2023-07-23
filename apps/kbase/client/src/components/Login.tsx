import Footer from "./nav/Footer";

import { Button } from "@chakra-ui/button";
import { appStore } from "../state/appStore";
import { Box, HStack } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // const userItems = useQuery(api.users.getAll)
  const userItems = [{}]
  const navigate = useNavigate()

  const login = appStore((state: any) => state.user)

  function setUser(user: any) {
    appStore.setState({ user })
    console.log('setUser', user)
    navigate('/')
  }
  console.log('userItems', userItems)

  const items = userItems?.map((item: any) => {
    return (
      <div key={item.user._id} >
        <Button onClick={() => setUser(item.user)}>{item.user.id}</Button>
      </div>
    )
  })

  return <Box className="page">
    <Footer />
    <h1>Login</h1>
    <Box>choose login:</Box>
    <HStack>
      {items}
    </HStack>
    <div>logged in as: {login?.id || 'none'}</div>
    <Link to={`/user/${login?.id}`}>go home</Link>
    <Link to={`/`}>main</Link>
  </Box>
}

export default Login;
