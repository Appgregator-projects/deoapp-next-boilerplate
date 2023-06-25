import { logOutUser } from '@/api/firebaseApi';
import { useConfig } from '@/hooks/zustand/configStore';
import useStore from '@/hooks/zustand/useStore';
import { Box, Button, HStack, Icon, Image, Spacer, Stack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiHeart, FiLogOut } from 'react-icons/fi'
import react,{useEffect,useState} from 'react';
import Link from 'next/link';
function BasicHeaderComponent() {
	// const value = useContext(GlobalContext);
	const configData = useStore(useConfig,(state) => state.data)
	const [config,setConfig]=useState()
	
	const value=null
	const { colorMode } = useColorMode();
	const defaultLogo = 'https://deoapp-web.web.app/static/media/deoapp%20colors%20(4).20631dfbbabe92c4cafe.png';

	useEffect(() => {
		setConfig(configData)
	
	  return () => {
		
	  }
	}, [configData])
	
	return (
		<Box position='sticky' p={3} top={0} zIndex={100} width='full' shadow='md' bgColor={colorMode === 'light' ? 'white' : 'black'}>
			<HStack >
				<Link href='/home'>
					<Image
						src={value?.webConfig?.logoLight ? value.webConfig.logoLight : defaultLogo}
						h='30px'
						alt='logo'
					/>

				</Link>
				<Button onClick={()=>console.log(config)}>Check state</Button>

				<Spacer />
				{/* <Stack bgColor='brand.1' w='6' h='6' borderRadius='full' alignItems='center' justifyContent='center' >
					<Icon as={colorMode === 'light' ? FiMoon : FiSun} w='4' h='4' onClick={toggleColorMode} />
				</Stack> */}
				{value?.auth ?
					<HStack p='2'>
						<Stack bgColor='brand.1' w='10' h='10' borderRadius='full' alignItems='center' justifyContent='center' >
							<Icon as={FiBell} w='6' h='6' />
						</Stack>
						<Stack bgColor='brand.1' w='10' h='10' borderRadius='full' alignItems='center' justifyContent='center' >
							<Icon as={FiHeart} w='6' h='6' />
						</Stack>
						<Stack bgColor='brand.1' w='10' h='10' borderRadius='full' alignItems='center' justifyContent='center' >
							<Icon as={FiLogOut} w='6' h='6' onClick={() => logOutUser()} />
						</Stack>
					</HStack>
					:
					<>
						{/* <Link to='/authentication/signup'> */}
							<Button size='xs' colorScheme={configData?.pages?.colorScheme} variant='outline'>Signup</Button>
						{/* </Link> */}
						{/* <Link to='/authentication/login'> */}
							<Button size='xs' colorScheme={configData?.pages?.colorScheme}>Login</Button>
						{/* </Link> */}
					</>
				}
			</HStack>
			{/* <HStack m='1'>
				{location.pathname !== '/' ? <BackButtonComponent /> : <></>}
				<Input type='text' placeholder='Search' />
				<Icon as={FiShare2} alignSelf='center' justifySelf='end' />
			</HStack> */}
		</Box>
	)
}

export default BasicHeaderComponent