'use client'
import { getCollectionFirebase } from '@/api/firebaseApi'
import { useConfig } from '@/hooks/zustand/configStore'
import { Link } from '@chakra-ui/next-js'
import { Button } from '@chakra-ui/react'
import React, {  useEffect } from 'react'

export default function Home() {
	const increaseConfig = useConfig((state) => state.increaseConfig)
	const id = useConfig((state) => state.id)
	const updateId=useConfig((state)=>state.updateId)

	useEffect(() => {	
		var host = window.location.host
		var subdomain = `${host.split('.')[0]}`
		const conditions = [{ field: "domains", operator: "array-contains", value: subdomain } ];
	  getCollectionFirebase('domains',conditions)
	  .then((x)=>{
		console.log(x)  
		updateId(x[0].id)})

		//onAuthStateChange()
	  return () => {
		
	  }
	}, [])
	

  return (
	<>
		<Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
			About - {id} -
  		</Link>
		  <Button onClick={increaseConfig}>Add</Button>
  		kodok asaem
  </>
  )
}
