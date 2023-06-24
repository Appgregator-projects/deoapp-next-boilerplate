import * as React from "react";
import { motion } from "framer-motion";
import { Box, Stack, Text } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

const variants = {
	open: {
		y: 0,
		x: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: -100,
		x: -100,
		opacity: 0,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	click: {
		y: 0,
		opacity: 0,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	}
};


export const MenuItem = ({ data, toggle, isOpen }) => {
	// console.log(data)
	return (
		<motion.div
			variants={variants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			<Box to={`/${data}`}>
				<Stack mt='-28'
					justifyContent='center'
					alignItems='center'
					shadow='base'
					w='70px' h='70px' bgColor={'brand.1'}
					borderRadius='full'
					onClick={() => toggle()}
				>
					{/* <Icon as={data.icon} w='8' h='8' /> */}
					<Text fontSize='xs'>{data}</Text>
				</Stack>
			</Box>

		</motion.div>
	);
};
