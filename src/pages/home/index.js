import { CarouselComponent } from '@/components/Galleries/Carousel/CarouselComponent'
import { useConfig } from '@/hooks/zustand/configStore'
// import HeaderOnlyLayout from '@/layouts/HeaderOnlyLayout'
import MicroFullLayout from '@/layouts/MicroFullLayout'
import { Box, Container, Flex, Heading, Icon, SimpleGrid, Stack, Text,Image, HStack, Spacer, Button } from '@chakra-ui/react'
import React from 'react'
import { FcElectronics } from "react-icons/fc";

function HomePage() {
	const id = useConfig((state) => state.id)
	const data =[
		{title:'event'},
		{title:'cart'},
		{title:'kodok'},
		{title:'gayung'},
		{title:'123123'},
		{title:'kodok'},
		{title:'gayung'},
		{title:'123123'},
	]

  return (
	  <MicroFullLayout>
	<Text>{id}</Text>
	<CarouselComponent/>
	<SimpleGrid columns='4' mt='2' >
		{data.map((x,i)=>
		<Stack key={i} justifyContent='center' alignItems='center' p='2' m='1' borderRadius='md' shadow='base'>
			<Icon as={FcElectronics} boxSize={6}/>
			<Text>{x.title}</Text>
		</Stack>
		)}
	</SimpleGrid>
	<HStack>
		<Heading p='2' >Blog</Heading>
		<Spacer/>
		<Text p='2'>View More</Text>
	</HStack>
	<Flex overflowX='auto' visibility='visible'>
	{data.map((x,i)=>
		<Stack key={i} justifyContent='center' alignItems='center' p='2' m='1' borderRadius='md' shadow='base'>
  			<Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' maxWidth='200px' />
			<Text>{x.title}</Text>
		</Stack>
		)}
	</Flex>
	</MicroFullLayout>
  )
}

export default HomePage