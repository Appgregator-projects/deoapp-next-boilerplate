import { Box, Heading, HStack, Icon, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import SettingLayout from './SettingLayout'
import { FiArrowRight, FiDollarSign, FiUser, FiCreditCard, FiMap, FiBook, FiLogOut } from 'react-icons/fi'

function index() {
	const user=false
	const menu = [
		{ icon: FiUser, title: 'Edit Profile', link: 'edit-profile' },
		{ icon: FiDollarSign, title: 'Manage Subscriptions', link: 'subscriptions' },
		{ icon: FiCreditCard, title: 'Add / Change Credit Card', link: 'credit-card' },
		{ icon: FiMap, title: 'Address', link: 'address' },
		{ icon: FiBook, title: 'Contact', link: 'contact' },
		{ icon: FiLogOut, title: 'Log Out', link: 'signout' }
	]
	// const user = auth.currentUser
  return (
	  <SettingLayout>
	
		<Box h='100%'>
			<Heading p='2'>Setting</Heading>
			{user ?
				menu.map((x, i) =>
					<Link key={i} to={x.link}>
						<HStack borderBottom='1px' m='2'>
							<Icon as={x.icon} />
							<Text>{x.title}</Text>
							<Spacer />
							<FiArrowRight />
						</HStack>
					</Link>
				)
				: 
				menu.map((x, i) =>
					<Box key={i} onClick={() => { console.log('/authentication/login') }} cursor='pointer'>
						<HStack borderBottom='1px' m='2'>
							<Icon as={x.icon} />
							<Text>{x.title}</Text>
							<Spacer />
							<FiArrowRight />
						</HStack>
					</Box>
				)
			}

		</Box>
	
	</SettingLayout>
  )
}

export default index