'use client'
import { getCollectionFirebase } from '@/api/firebaseApi'
import LoaderComponent from '@/components/Spinners/LoaderComponent'
import { useConfig } from '@/hooks/zustand/configStore'
import HomePage from '@/pages/home'
import { Link } from '@chakra-ui/next-js'
import { Button, ScaleFade, Stack, Text } from '@chakra-ui/react'
import React, {  useEffect } from 'react'

export default function Home() {
	const id = useConfig((state) => state.id)
	const updateId=useConfig((state)=>state.updateId)
	const  windowConfig={host:''}

	useEffect(() => {	
		windowConfig.host = window.location.host
		windowConfig.subdomain = windowConfig.host.split('.')
		windowConfig.newDomain = `${windowConfig.subdomain[0]}.${windowConfig.subdomain[1]==='localhost:3000'?'deoapp.site':windowConfig.subdomain[1]}`
	const conditions = [{ field: "domains", operator: "array-contains", value: windowConfig.newDomain } ];
	  getCollectionFirebase('domains',conditions)
	  .then((x)=>{
		console.log(x)  
		updateId(x[0]?.id)}
		)
		.catch((err)=>console.log(err.message))
	  
	  return () => {
	  }
	}, [])
	

  return (
	<>
	{id!=='0'?
	<HomePage/>
	:
		<ScaleFade initialScale={36} in>
			<Stack alignItems='center' minH='99vh' justifyContent='center' >
				<LoaderComponent/>
				<Text>{windowConfig.host} - {windowConfig.subdomain} - {windowConfig.newDomain}</Text>
				<Text>Build & design by deoapp.com</Text>
			</Stack>
		</ScaleFade>
}
  </>
  )
}
