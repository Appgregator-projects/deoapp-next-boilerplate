import { Image, Stack, Text, VStack } from '@chakra-ui/react'
import { PriceTag } from './CartDrawer/PriceTag'

export const CheckoutDrawerComponent = (props) => {
     const {
          name,
          qty,
          image,
          price,
     } = props


     return (
          <Stack direction="row" spacing="5" mx='4'>
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
                    <Text fontWeight="medium">{name}</Text>
                    <PriceTag price={price} currency='IDR' />
               </Stack>

               <VStack dir='column'>
                    <Text>Qty</Text>
                    <Text>{qty}</Text>
               </VStack>

          </Stack >
     )
}