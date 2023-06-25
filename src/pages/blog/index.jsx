'use client'
import React ,{useState,useEffect}from 'react'
import { useConfig } from '@/hooks/zustand/configStore'
import useStore from '@/hooks/zustand/useStore'
import { SimpleGrid, Text } from '@chakra-ui/react'
import BlogLayout from './BlogLayout'

function Blog() {
	const [config,setConfig]=useState()
	const dataConfig = useStore(useConfig,(state) => state.data)
	
	useEffect(() => {
		setConfig(dataConfig)
	return () => {}
	}, [dataConfig])

  return (
	  <BlogLayout>
	<Text>{config?config.id:0}</Text>
	<SimpleGrid columns='2'>

	</SimpleGrid>
	</BlogLayout>
  )
}

export default Blog