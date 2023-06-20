import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import ProductLayout from './ProductLayout'

function index() {

	const data = ['kodok','kucing']
  return (
	<ProductLayout>
		<SimpleGrid columns='2'>
			{data.map((x,i)=><Box key={i}>{x}</Box>)}
		</SimpleGrid>
	</ProductLayout>
  )
}

export default index