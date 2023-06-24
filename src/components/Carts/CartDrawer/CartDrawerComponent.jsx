import {
	Box,
	Button,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	HStack,

	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { GlobalContext } from '../../../Hooks/Contexts/GlobalContext'
import CartMicroSite from '../../../Pages/Cart/CartMicroSite'


function CartDrawerComponent() {
	const value = useContext(GlobalContext)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()

	return (<>
		<HStack position='sticky' shadow='base' bottom='0' p='2' mb='5' bgColor='white'>
			<Button width='full' variant='outline' colorScheme={value.webConfig.colorScheme}>Beli</Button>
			<Button width='full' colorScheme={value.webConfig.colorScheme} onClick={onOpen}>Tambah ke keranjang</Button>
		</HStack>
		<Drawer
			isOpen={isOpen}
			placement='right'
			onClose={onClose}
			finalFocusRef={btnRef}
		>
			<Box height="100vh">
				<DrawerOverlay />
				<DrawerContent
					bg={useColorModeValue('white', 'gray.800')} overflowY="auto"
				>
					{/* <DrawerCloseButton
						size="lg"
						right={{
							base: '4',
							md: '8',
						}}
						top="4"
						bg="inherit"
					/> */}
					<CartMicroSite />

				</DrawerContent>
			</Box>
		</Drawer>

	</>
	)
}

export default CartDrawerComponent