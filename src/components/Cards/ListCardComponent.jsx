import { Box, Heading, Spacer, Text, Image, VStack, Badge, Flex } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'
// import { Link } from 'react-router-dom';

function ListCardComponent(props) {
	const x = props.data;

	return (
		<Link href={`/course/${x.id}`}>
			<VStack m='2' shadow='md' borderRadius='md' mx={2} my={10} bg='white'>
				<Image borderTopRadius={10} objectFit="cover" w='full' h='200px'
					// src='https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://cdn.filestackcontent.com/bLy3JtIoQ8y8PDs4tFem'
					src={x.thumbnail}
					alt={x.title} />
				<VStack>
					<Box m={4}>
						<Flex justify='space-between' align='center'>
							<Heading fontSize='md'>{x.title}</Heading>
							{props.data.tags ? props?.data?.tags?.map((item, i) => (
								<Badge key={i} mt='1' colorScheme='blue' h='fit-content'>{item}</Badge>
							)) : <></>}

						</Flex>
						<Flex justify='space-between' align='center' my={2}>
							<Text fontSize='sm' color='blackAlpha.700' noOfLines='3'>{x.description}</Text>
							{/* <Text textAlign='end'>Rp{x.price}</Text> */}

						</Flex>

					</Box>
					<Spacer />
					{/* <Button justifySelf='flex-end' w='full' colorScheme={value.webConfig.colorScheme}>View</Button> */}
				</VStack>
			</VStack>

		</Link>

	)
}

export default ListCardComponent