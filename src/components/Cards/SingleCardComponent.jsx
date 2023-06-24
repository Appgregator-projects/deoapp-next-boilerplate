import { Button, Heading, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../Hooks/Contexts/GlobalContext'

function SingleCardComponent(props) {
	const value = useContext(GlobalContext)
	const x = props.data
	return (
		<Link to={`${x.id}`}>
			<VStack p='2' m='1' border='1px' borderRadius='md'>
				<Image objectFit="cover" w='200px' h='200px' src='https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' alt='kodok' />
				<Heading>{x.title}</Heading>
				<Text>{x.description}</Text>
				<Spacer />
				<Text>${x.price}</Text>
				<Button width='full' colorScheme={value.webConfig.colorScheme}>Buy</Button>
			</VStack>
		</Link>
	)
}

export default SingleCardComponent