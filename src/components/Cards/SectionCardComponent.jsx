import { Heading, HStack, Image, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

function SectionCardComponent(props) {
     const { data, type } = props;

     return (
          <Link to={type === 'section' ? `section/${data.title}` : type === 'lesson' ? `lesson/${data.id}` : null} state={{ data }}>
               <HStack p='2' m='2' borderRadius='lg' shadow='lg' {...props}>
                    {type === 'section' ? null :
                         <Image
                              objectFit="cover"
                              w='60px'
                              h='60px'
                              src='https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
                              alt='kodok'
                         />
                    }
                    <Stack w='100%'>
                         <Flex justifyContent='space-between' align='center'>
                              <Heading fontSize='xs'>{data.title}</Heading>
                              <FiArrowRight />
                         </Flex>
                    </Stack>
               </HStack>
          </Link>
     )
}

export default SectionCardComponent