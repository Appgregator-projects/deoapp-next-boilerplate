'use client'
import {
	Box,
	Button,
	Flex,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Heading,Spinner,
	HStack,
	Grid,
	Text,
	Stack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";

import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { auth } from "@/Config/firebase";
import useStore from "@/hooks/zustand/useStore";
import { useConfig } from "@/hooks/zustand/configStore";
import { getCollectionFirebase, getSingleDocumentFirebase } from "@/api/firebaseApi";
import CourseLayout from "./CourseLayout";
import parse from 'html-react-parser';


const SingleCourseSite = () => {
	const configData = useStore(useConfig,(state) => state.data)
	const params = useRouter();
	const { push } = useRouter();
	

	const [user,setUser]=useState()
	const [value,setValue]=useState()
	const [noOfLines, setNoOfLines] = useState(5);
	const [courseDetail, setCourseDetail] = useState({});
	const [lessons, setLessons] = useState(null);
	const [domLoaded,setDomLoader]=useState(false)

	const getCourseDetail =  async() => {
		console.log(params,params.query.courseId,'ini di get course detail')
		
		getSingleDocumentFirebase('courses', params.query.courseId)
		.then((res)=>{
			if(res){
				setCourseDetail(res)
				setDomLoader(true)
			}
			console.log(res,'ini get single document')
		})
		.catch((err)=>console.log(err.message))

		getCollectionFirebase(`courses/${params.query.courseId}/lessons`)
		.then((res)=>setLessons(res))
		.catch((err)=>console.log(err.message))


	};

	const handleAddToCart = async () => {
		//check if user loggedin ?
		if (user) {
			let newCart = value?.cart?.carts;
			newCart = newCart?.findIndex(item => item.id === params.courseId);

			if (newCart === -1) {
				setDoc(
					doc(db, "carts", `${value?.webConfig?.projectsId}-${user?.uid}`),
					{
						carts: arrayUnion({
							id: params.courseId,
							name: courseDetail.title,
							price: courseDetail.price,
							image: courseDetail.thumbnail,
							// link: courseDetail.link,
							qty: 1
						}),
					},
					{ merge: true }
				).then(() => {
					handleToast(
						"Keranjang",
						`Berhasil menambahkan ${courseDetail.title} ke keranjang kamu`,
						"success"
					);
				})
			} else {
				setDoc(
					doc(db, "carts", `${value?.webConfig?.projectsId}-${user?.uid}`),
					{
						carts: arrayUnion({
							id: params.courseId,
							name: courseDetail.title,
							price: courseDetail.price,
							image: courseDetail.thumbnail,
							// link: courseDetail.link,
							qty: value?.cart?.carts[newCart]?.qty + 1
						}),
					},
					{
						carts: arrayRemove({
							id: params.courseId,
							name: courseDetail.title,
							price: courseDetail.price,
							image: courseDetail.thumbnail,
							// link: courseDetail.link,
							qty: value?.cart?.carts[newCart]
						})
					},
					{ merge: true }
				).then(() => {
					handleToast(
						"Keranjang",
						`Berhasil menambahkan ${courseDetail.title} ke keranjang kamu`,
						"success"
					);
				})
			}
		} else {
			// toast(
			// 	"Daftar / Login",
			// 	"Kamu harus mendaftarkan diri untuk membeli produk ini",
			// 	"warning"
			// );
			console.log("/authentication/login", { replace: true });
		}
	};


	useEffect(() => {
		if(configData?.id){
			getCourseDetail();
			console.log(configData)
			setValue(configData)
			setUser(auth.currentUser)
		}
	}, [configData]);

	return (
		<CourseLayout>
			{domLoaded && (
			<>
			<Box>
				<ReactPlayer
				width="full"
				controls={true}
				url={courseDetail[0]?.videoThumbnail?courseDetail[0].videoThumbnail:'0'}
				/>

				{courseDetail[0]? (
					<>
						<Box m={5} noOfLines={noOfLines} fontSize={12}>
							{parse(courseDetail[0]?.description)}
						</Box>
						<Flex justifyContent='flex-end'>
							<Button
								onClick={() => {
									if (noOfLines === 5) setNoOfLines(null)
									if (noOfLines === null) setNoOfLines(5)
								}}
								size='xs'
								variant='ghost'
							>
								{noOfLines === 5 ? 'Read more...' : 'collapse'}
							</Button>
						</Flex>

					</>
				) : <></>}


				<Box mx={4} my={10}>
					<Accordion allowToggle>
						{courseDetail?.sections?
						courseDetail.sections.map((section, i) => {
							const numberOfLessons = lessons?.filter(item => item.section === section.title)?.length;
							return (
								<AccordionItem key={i} bg='white' my={2}>
									<h2>
										<AccordionButton>
											<Stack gap={2} as="span" flex='1' textAlign='left'>
												<Heading size='sm'>{section.title}</Heading>
												<HStack>
													<Text color='blackAlpha.700' fontSize={14} size='md'>{numberOfLessons} lessons available</Text>
												</HStack>
											</Stack>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<Grid gap={2}>
											{lessons?.filter(item => item.section === section.title).map((lesson, idx) => (
												<Box bg='blackAlpha.50' p={2} key={idx}>
													<Flex justifyContent='space-between'>
														<Text fontSize={13} fontWeight={500} color='blackAlpha.800'>{lesson?.title}</Text>
														<Button
															size='sm'
															variant='outline'
															colorScheme={value?.webConfig?.colorScheme}
															//params.query.courseId
															onClick={() => push(`/course/lesson/${params.query.courseId}/${lesson.id}`)}
														>
															Review
														</Button>
													</Flex>
												</Box>
											))}
										</Grid>
									</AccordionPanel>
								</AccordionItem>
							)
						})
					:
					<></>}
					</Accordion>
				</Box>
			</Box>
			<Box display='fixed' bottom='0'>
				{courseDetail?.price !== 'free' && user?.uid !== undefined && !user?.purchases?.includes(courseDetail?.id) ?
					<Button width='full' colorScheme={value?.pages?.colorScheme} onClick={() => handleAddToCart()}>Add to Cart</Button>
					: courseDetail?.price !== 'free' && user?.uid === undefined ?
						<Button width='full' colorScheme={value?.pages?.colorScheme} onClick={() => console.log('/login')}>Add To Cart</Button> : <></>
				}
			</Box>
			</>
			)}
		</CourseLayout>
	)
}

export default SingleCourseSite;