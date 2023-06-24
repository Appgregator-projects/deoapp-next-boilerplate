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
	
	const host = window.location.host
	const subdomain = host.split('.')
	const newDomain = `${subdomain[0]}.${subdomain[1]==='localhost:3000'?'deoapp.site':subdomain[1]}`

	useEffect(() => {	
		
	const conditions = [{ field: "domains", operator: "array-contains", value: newDomain } ];
	  getCollectionFirebase('domains',conditions)
	  .then((x)=>{
		console.log(x)  
		updateId(x[0].id)})
	  return () => {
		
	  }
	}, [])
	

  return (
	<>
	{id?
	<HomePage/>
	:

		  <ScaleFade initialScale={36} in>
		<Stack alignItems='center' minH='99vh' justifyContent='center' >
						<LoaderComponent/>
						<Text>{host} - {subdomain} - {newDomain}</Text>
						<Text>Build & design by deoapp.com</Text>
		</Stack>
		</ScaleFade>
}
  </>
  )
}
