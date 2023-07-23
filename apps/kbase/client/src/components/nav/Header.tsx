import { Flex, Spacer } from '@chakra-ui/react';
import { pStore } from "../../state/appStore";
import { Link } from 'react-router-dom';

// TODO - update status? to refresh $revs balance

function Header() {
  const user = pStore((state: any) => state?.user)
  const userLink = user?.id?.length ? `/user/${user?.id}` : '/users'
  // const userLink = '/users'
  let loginButton

  if (!user?.id) {
    loginButton = <Link className='link-btn' to='/users'>login</Link>
  } else {
    loginButton = <Link className='link-btn' to={userLink}>{user?.name}</Link>
  }

  // if (login?.id) console.log('Header', { login, userLink })

  return (
    <Flex className="header-nav">
      <Link className='link-btn' to={`/`}>TOP</Link>
      <Link className='link-btn' to={`/books/negotiation`}>books</Link>
      <Spacer />

      {loginButton}
    </Flex>
  )
}

export default Header;

