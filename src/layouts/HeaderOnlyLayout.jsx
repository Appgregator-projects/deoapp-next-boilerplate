import { Container, Heading } from '@chakra-ui/react'
import React from 'react'

function HeaderOnlyLayout({children}) {
  return (
	<Container shadow='base'>
		<Heading>ini judulnya</Heading>
		{children}
	</Container>
  )
}

export default HeaderOnlyLayout