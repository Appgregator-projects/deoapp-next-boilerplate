import { Button, Flex, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { useContext } from 'react'
import { GlobalContext } from '../../../Hooks/Contexts/GlobalContext'
import { arrayRemove, doc, setDoc } from 'firebase/firestore'
import { db } from '../../../Config/firebase'
import { useEffect } from 'react'

export const CartItem = (props) => {
	const value = useContext(GlobalContext)
	const {
		name,
		id,
		description,
		qty,
		image,
		currency,
		price,
		setData,
		inputQty,
		setInputQty,
		getData
	} = props

	const onClickDelete = async (id) => {
		const res = await setDoc(
			doc(db, "carts", `${value?.webConfig?.projectsId}-${value?.uid}`),
			{
				carts: arrayRemove({
					id: id,
					name: name,
					price: price,
					image: image,
					// link: courseDetail.link,
					qty: qty,
				}),
			},
			{ merge: true }
		);
		setData(res)
		getData()
	}

	const handleQty = (type) => {
		if (type === 'decrement') {

			let dcr = inputQty
			setInputQty(dcr - 1)
			if (inputQty === 1) {
				setInputQty(1)
			}
		} else if (type === 'increment') {
			let inc = inputQty
			setInputQty(inc + 1)
		}
	}



	useEffect(() => {
		setInputQty(qty)
	}, [])

	return (
		<Stack direction="row" spacing="5">
			<Image
				rounded="md"
				minWidth="24"
				maxWidth="24"
				height={{
					base: '20',
					md: '24',
				}}
				fit="cover"
				src={image}
				alt={name}
				draggable="false"
				loading="lazy"
			/>
			<Stack width="full" spacing="3">
				<Stack
					direction={{
						base: 'column',
						md: 'row',
					}}
					spacing="3"
					alignItems="flex-start"
				>
					<Stack spacing="0.5" width="full">
						<Text fontWeight="medium">{name}</Text>
						<Text color={useColorModeValue('gray.500', 'gray.300')}>{description}</Text>
					</Stack>
					<PriceTag price={price} currency={currency} />
				</Stack>
				<Flex width="full" justifyContent="space-between" alignItems="center">
					<InputGroup size='sm' w='110px' overflow='hidden'>
						<InputLeftElement>
							<Button size='sm' onClick={() => handleQty('decrement')}>-</Button>
						</InputLeftElement>
						<Input
							type='text'
							min='0'
							textAlign='center'
							value={inputQty} onChange={(e) => setInputQty(e.target.value)}
						/>
						<InputRightElement>
							<Button size='sm' onClick={() => handleQty('increment')} >
								+
							</Button>
						</InputRightElement>
					</InputGroup>

					<Link
						as="button"
						type="button"
						fontWeight="medium"
						fontSize="sm"
						color={useColorModeValue('blue.500', 'blue.200')}
						onClick={() => onClickDelete(id)}
					>
						Remove
					</Link>
				</Flex>
			</Stack>
		</Stack>
	)
}