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
	const [domain,setDomain]=useState()
	const  windowConfig={host:''}

	useEffect(() => {	
		console.log(configData,'ini config data di app page')
		windowConfig.host = window.location.host
		windowConfig.subdomain = windowConfig.host.split('.')
		windowConfig.newDomain = `${
			windowConfig.subdomain[0]}.${windowConfig.subdomain[1]==='localhost:3000'?
			'deoapp'
			:
			windowConfig.subdomain[1]}`
			setDomain(windowConfig.newDomain)
		
		console.log(windowConfig)
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
				<Text>{domain}</Text>
				<Text>Build & design by deoapp.com</Text>
			</Stack>
		</ScaleFade>
		:
		// <Text>{domain}</Text>	
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
