import BasicHeaderComponent from '@/components/Header/BasicHeaderComponent'
import { Container } from '@chakra-ui/react'
import React from 'react'

function MicroHeaderOnlyLayout({children}) {
  return (
	<Container maxW='md' p='0' position='relative' shadow='base' minH='100vh'>
			<BasicHeaderComponent />
			{children}
			{/* <Box position='fixed' justifyContent='center' display='flex' bottom={0} right={0} left={0}>
				<MicroNavbar maxW='md' shadow='base' width='full' bgColor={'brand.1'} p='2' />
			</Box>
			<Box mb={20}></Box> */}
		</Container>
  )
}

export default MicroHeaderOnlyLayout