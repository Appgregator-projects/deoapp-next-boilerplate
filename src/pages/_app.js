import { getCollectionFirebase, getSingleDocumentFirebase } from '@/api/firebaseApi';
import { useConfig } from '@/hooks/zustand/configStore';
import useStore from '@/hooks/zustand/useStore';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import react,{useEffect} from 'react';

function MyApp({ Component, pageProps }) {
	const configData = useStore(useConfig,(state) => state.data)
	const updateData= useConfig((state)=>state.updateData)
	const clearData = useConfig((state)=>state.clearData)

	useEffect(() => {
		const host = window.location.host
		const subdomain = host.split('.')
		const newDomain = `${subdomain[0]}.${subdomain[1]==='localhost:3000'?'deoapp.site':subdomain[1]}`
		console.log(newDomain)
		const conditions = [{ field: "domain", operator: "==", value: newDomain } ];
	  
	getCollectionFirebase('domains',conditions)
	  .then((x)=>{
		console.log(x,'di _app')  
		getSingleDocumentFirebase('pages',x[0].id)
			.then((z)=> {
				console.log(x[0].id,z)
				updateData({
					id:x[0].id,
					pages:z
				})
			})
			// .then(()=>setConfig(x[0].id))
			.catch((err)=>console.log(err.message))
			return 
		})
		.catch((err)=>console.log(err.message))

	  return () => { 
		clearData()
	  }
	}, [])
	
  return (
    <ChakraProvider theme={extendTheme({
		colors:{
			brand: configData?.pages?.brand?configData.pages.brand : 0
		}})}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;