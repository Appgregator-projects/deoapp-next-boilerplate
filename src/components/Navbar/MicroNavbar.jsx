import { Badge, Box, Center, Container, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FiBookOpen, FiHome, FiMenu, FiSettings, FiShoppingCart } from 'react-icons/fi'
// import { Link } from 'react-router-dom'
// import { GlobalContext } from '../../Hooks/Contexts/GlobalContext'
import { CircularMenuComponent } from '../Buttons/CircularMenu/CircularMenuComponent'

function MicroNavbar(props) {
	// const value = useContext(GlobalContext)
	const value=null

	const menu = [
		{ title: 'Home', icon: FiHome, link: '/' },
		{ title: 'News', icon: FiBookOpen, link: '/blog' },
		{ title: 'Menu', icon: FiMenu, link: '/' },
		{ title: 'Cart', icon: FiShoppingCart, link: '/cart' },
		{ title: 'Setting', icon: FiSettings, link: '/setting' },
	]

	return (
		<Box {...props}>
			<SimpleGrid columns={5} alignContent='center'>
				{/* <Flex> */}
				{menu.map((x, i) => {
					if (i === 2)
						return (
							<Container key={i}  >
								<CircularMenuComponent data={value?.webConfig?.features} />
							</Container>
						)
					else if (i === 3)
						return (
							<Box key={i} to={x.link}>
								<Center >
									<Flex>
										<Icon as={x.icon} boxSize={6} />
										<Box>
											<Badge colorScheme='red' borderRadius='full' ml='-1' mt='-5'>{value?.cart?.carts ? value.cart.carts.length : 0}</Badge>
										</Box>
									</Flex>
								</Center>
								{/* <Text textAlign='center' fontSize='xs' >{x.title}</Text> */}
							</Box>
						)
					else
						return (
							<Box key={i} to={x.link} >
								<Link href={x.link}>
								<Center>
									<Icon as={x.icon} boxSize={6} />
								</Center>
								<Text textAlign='center' fontSize='xs' >{x.title}</Text>
								</Link>
							</Box>
						)
				}
				)}
				{/* </Flex> */}
			</SimpleGrid>
		</Box >
	)
}

export default MicroNavbar