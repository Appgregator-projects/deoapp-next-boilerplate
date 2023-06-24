import { HStack } from '@chakra-ui/react'
import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function BackButtonComponent() {
	const navigate = useNavigate()
	return (
		<HStack onClick={() => navigate(-1)}  >
			<FiArrowLeft />
		</HStack>
	)
}

export default BackButtonComponent