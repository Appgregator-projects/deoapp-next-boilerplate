import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
// import { GlobalContext } from '../../Hooks/Contexts/GlobalContext'
import { getCollectionWhereFirebase } from '../../Api/firebaseApi';
// import { useNavigate } from 'react-router-dom';

function HomeCarousel(props) {
	// const value = useContext(GlobalContext);
	const value= null
	let data;
	const [courses, setCourses] = useState(null);
	// const navigate = useNavigate();

	const getData = async () => {
		setTimeout(console.log(props.type, "tipe konten pada home carousel"), 3000)
		if (props.type !== undefined && props.type === 'course') {

			const res = await getCollectionWhereFirebase(
				"courses",
				"projectsId",
				"==",
				value.webConfig.id
			);
			setCourses(res);
		};
	};

	
	if (!props.data && !courses) {
		data = [
			{ title: 'product #1', image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' },
			{ title: 'product #2', image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' },
			{ title: 'product #3', image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' },
			// { title: 'product #4', image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' },
			// { title: 'product #5', image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' },
		]
	} else if (courses) {
		data = courses
	} else {
		data = props.data
	};

	const handleClick = data => {
		// props.type === 'course' && navigate(`course/${data.id}`)
	};


	useEffect(()=>{
		getData();
	},[]);

	return (
		data.map((x, i) =>
			<Box key={i} shadow='base' p='2' m='1'>
				<Image objectFit="cover" src={x.image || x.thumbnail} alt={x.title} />
				<Text fontSize={12}>{x.title}</Text>
				<Button width='full' size='xs' colorScheme={value?.webConfig?.colorScheme} onClick={()=>handleClick(x)}>Lihat</Button>
			</Box>
		)
	)
}

export default HomeCarousel