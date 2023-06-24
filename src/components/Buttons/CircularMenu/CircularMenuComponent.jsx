import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { Center, } from "@chakra-ui/react";

export const CircularMenuComponent = (props) => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={height}
			ref={containerRef}
		>
			{/* <motion.div className="background" variants={sidebar} /> */}
			<Center
				mt='-5'
				justifyContent='center'
				alignItems='center'
				shadow='base' w='60px' h='60px'
				borderRadius='full'
				bgColor='brand.1'
				onClick={() => toggleOpen()}>
				<MenuToggle />
			</Center>
			<Center bgColor='blue'>
				<Navigation isOpen={isOpen} toggle={toggleOpen} data={props.data} />
			</Center>


		</motion.nav>
	);
};
