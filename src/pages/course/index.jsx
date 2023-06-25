import { getCollectionFirebase } from "@/api/firebaseApi";
import ListCardComponent from "@/components/Cards/ListCardComponent";
import { useConfig } from "@/hooks/zustand/configStore";
import useStore from "@/hooks/zustand/useStore";
import {
	Box,
	Center,
	Heading,
	SimpleGrid,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import CourseLayout from "./CourseLayout";
// import ListCardComponent from "../../Components/Cards/ListCardComponent";
// import SingleCardComponent from "../../Components/Cards/SingleCardComponent";
// import { GlobalContext } from "../../Hooks/Contexts/GlobalContext";
// import { getCollectionFirebase } from "../../Api/firebaseApi";

function CourseMicroSite() {
	const configData = useStore(useConfig,(state) => state.data)

	// const value = useContext(GlobalContext);
	// const [layout, setLayout] = useState("single");
	const [data, setData] = useState(null);
	const [value,setValue]=useState()


	const getData = async () => {
		const conditions = [
			{ field: "projectsId", operator: "==", value: configData.id },
		];
		const sortBy = { field: "createdAt", direction: "asc"};

		console.log(conditions,sortBy,'ini di get data course')
		try {
			const res = await getCollectionFirebase(
				"courses",
				conditions,
				sortBy ,
				10
			);
			setData(res);
			console.log(res, "result of get courses");
		} catch (error) {
			console.log(error, "ini error");
		}
	};

	useEffect(() => {
		if(configData){
			setValue(configData)
			console.log(configData)
			getData();

		}

		return () => {
			setData();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [configData]);

	return (
		<CourseLayout>
		<Box bg='whiteAlpha.800'>
			<SimpleGrid columns="3" bgColor="brand.1" p="2">
				{/* <Text>Filter</Text> */}
				<Text></Text>
				<Heading textAlign="center" fontSize="md">
					Courses 
					{/* {value?.id} */}
				</Heading>
				<Stack alignItems="flex-end" justifyContent="center">
					{/* <ViewBars setLayout={setLayout} layout={layout} /> */}
				</Stack>
				<Stack alignItems="flex-end" justifyContent="center">
				</Stack>
			</SimpleGrid>
			
			{data ? (
				<SimpleGrid 
				// columns={layout === "single" ? 1 : 2}
				columns={2}
				>
					{data?.map((x, i) => <ListCardComponent key={i} data={x} />)}
				</SimpleGrid>
			) : (
				<Center>
					<Spinner />
				</Center>
			)}
		</Box>
		</CourseLayout>
	);
}

export default CourseMicroSite;
