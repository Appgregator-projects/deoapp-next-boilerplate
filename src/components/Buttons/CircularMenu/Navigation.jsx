import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { HStack } from "@chakra-ui/react";

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 }
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 }
	}
};

export const Navigation = ({ toggle, data, isOpen }) => {
	return (
		<motion.ul variants={variants}>
			<HStack>
				{data?.map((x, i) => (
					<MenuItem data={x} key={i} isOpen={isOpen} toggle={toggle} />
				))
				}
			</HStack>
		</motion.ul>
	)
};
