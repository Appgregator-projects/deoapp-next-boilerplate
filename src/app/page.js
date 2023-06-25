'use client'
import { getCollectionFirebase, getSingleDocumentFirebase } from '@/api/firebaseApi'
import LoaderComponent from '@/components/Spinners/LoaderComponent'
import { useConfig } from '@/hooks/zustand/configStore'
import useStore from '@/hooks/zustand/useStore'
import HomePage from '@/pages/home'

import { Button, ScaleFade, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, {  useEffect,useState } from 'react'

export default function Home() {
	const { push } = useRouter();

	const configData= useStore(useConfig,(state)=>state.data)
	const [config,setConfig]=useState()
	const  windowConfig={host:''}

	useEffect(() => {	
		console.log(configData,'ini config data di app page')
		setConfig(configData)
	  return () => {
	  }
	}, [configData])
	

  return (
	<>
	{!config?.pages?.brand[0]?
		<ScaleFade initialScale={36} in>
			<Stack alignItems='center' minH='99vh' justifyContent='center' >
				<LoaderComponent/>
				<Text>{windowConfig.host} - {windowConfig.subdomain} - {windowConfig.newDomain}</Text>
				<Text>Build & design by deoapp.com</Text>
			</Stack>
		</ScaleFade>
		:
		push('/home')
		// <>
		// <Text>{config?.pages?.brand[0]}</Text>
		// <Text>kodok</Text>
		// 		<HomePage/>

		// </>
	}
  </>
  )
}
