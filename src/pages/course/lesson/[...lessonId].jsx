'use client'
import { getSingleDocumentFirebase } from '@/api/firebaseApi';
import { Box, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
import CourseLayout from '../CourseLayout'
import parse from 'html-react-parser';

function LessonSingle() {
	const params = useRouter();
	const [dataLesson, setDataLesson] = useState({});
	
	const getLessonDetail = async () => {
		console.log(params.query.lessonId)
		const res = await getSingleDocumentFirebase(`courses/${params.query.lessonId[0]}/lessons`, params.query.lessonId[1]);
		console.log(res, 'this is data lesson detail')
		setDataLesson(res);
	};

	useEffect(() => {
		getLessonDetail()
	}, [])

  return (
	<CourseLayout>
		<Box minH='100%' >
			<Box mb='5' shadow='base' >
				<ReactPlayer
					width='full'
					controls
					url={dataLesson?.media ? dataLesson.media : 'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
				/>
			</Box>

			<Box mb='5' shadow='base' >
				<HStack p='2'>
					<Heading  size='sm'>{dataLesson?.title}</Heading>
					<Spacer />
				</HStack>
			</Box>

			{dataLesson && dataLesson?.description ?
				<Box mb='5' shadow='base' p='2' fontSize={12}>
					{parse(dataLesson?.description)}
				 </Box>
				:
				<></>
			}

			{/* <HStack pos='sticky' bottom='5' width='full'>
				<Button width='full' size='sm' variant='outline' colorScheme={value.webConfig.colorScheme}>Mark as Finished</Button>
				<Button width='full' size='sm' colorScheme={value.webConfig.colorScheme}>Next Lesson</Button>
			</HStack> */}
		</Box>
	</CourseLayout>
  )
}

export default LessonSingle