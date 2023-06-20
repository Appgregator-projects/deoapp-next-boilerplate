import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import ProductLayout from './ProductLayout'

function ViewProductPage() {
	const router = useRouter()

  return (
	  <ProductLayout>
	  <Box>
		  <Text>ID param:{router.query.id}</Text>
	  </Box>
	  </ProductLayout>
  )
}

export default ViewProductPage