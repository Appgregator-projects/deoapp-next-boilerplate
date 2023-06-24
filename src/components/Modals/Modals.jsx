import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { auth, db, storage } from '../../Config/firebase'
import { doc, setDoc, updateDoc, } from 'firebase/firestore'
import { updatePassword } from 'firebase/auth'
import { getDownloadURL, uploadBytesResumable, ref, deleteObject } from 'firebase/storage'
import { useNavigate } from 'react-router'

const Modals = (props) => {
     const user = auth.currentUser;
     const toast = useToast()
     const navigate = useNavigate()
     const { isOpen, onClose, data, reload, setReload, setLoading } = props
     const [input, setInput] = useState(null)
     const [show, setShow] = useState(false)
     const handleClick = () => setShow(!show)

     const handleSave = async () => {
          if (data?.type === 'name') {
               const dataRef = doc(db, "users", user.uid);
               await updateDoc(dataRef, {
                    name: input.name
               });
               toast({
                    title: 'Success',
                    description: 'Full name has been edited!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
               })
               setReload(!reload)

          } else if (data?.type === 'password') {
               updatePassword(user, input.password).then(() => {
                    toast({
                         title: 'Success',
                         description: 'Password has been edited!',
                         status: 'success',
                         duration: 9000,
                         isClosable: true,
                    })

               }).catch((error) => {
                    console.log(error)
               });
               setReload(!reload)

          } else if (data?.type === 'photo') {
               const path = `users/${user.uid}/profile/${input.image.name}`;
               const storageRef = ref(storage, path);
               const uploadTask = uploadBytesResumable(storageRef, input.image);
               uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                         const progress =
                              (snapshot.bytesTransferred /
                                   snapshot.totalBytes) *
                              100;
                         console.log("Upload is " + progress + "% done");
                         if (progress !== 100) setLoading(progress);
                         else {
                              setLoading(false);
                         }
                    },
                    (error) => {
                         console.log(error.message);
                    },
                    () => {
                         getDownloadURL(uploadTask.snapshot.ref)
                              .then((downloadURL) => {
                                   console.log(
                                        "File available at",
                                        downloadURL
                                   );

                                   setInput({
                                        ...input,
                                        image: downloadURL,
                                   });
                                   return downloadURL;
                              })
                              .then((downloadURL) => {
                                   setInput({
                                        image: downloadURL,
                                        updatedAt: new Date(),
                                   });
                                   input.image = downloadURL;
                                   // update data
                                   const ref = doc(
                                        db,
                                        "users",
                                        user.uid
                                   );
                                   setDoc(ref, input, { merge: true }).then(() => {
                                        toast({
                                             title: "Profile Saved",
                                             description:
                                                  "Your profile has been saved!",
                                             status: "success",
                                             duration: 9000,
                                             isClosable: true,
                                        });
                                        setReload(!reload)

                                   }).catch((error) => {
                                        console.log(error)
                                   });                                   // setLoading(true);

                              });
                    }
               );

          } else if (data?.type === 'confirm-delete') {
               const str = data?.image
               const str1 = str.split('?')
               const str2 = str1[0].split('%2F')

               const refs = doc(
                    db,
                    "users",
                    user.uid
               );
               const desertRef = ref(storage, `users/${user.uid}/profile/${str2[3]}`);

               // Delete the file

               deleteObject(desertRef).then(() => {
                    setDoc(refs, { image: null }, { merge: true }).then(() => {
                         toast({
                              title: "Profile Deleted!",
                              description:
                                   "Your profile has been deleted!",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                         });
                         setReload(!reload)
                    }).catch((error) => {
                         console.log(error)
                    });

               }).catch((error) => {
                    console.log(error)
               });

          }
          onClose()
     }

     return (
          <Modal isOpen={isOpen} onClose={onClose}>
               <ModalOverlay />
               <ModalContent>
                    <ModalHeader textTransform='capitalize'>
                         {data?.type !== undefined ? (data?.type?.includes('alert') ? 'Alert' : data?.type === 'confirm-delete' ? 'Confirm Delete' : `Change ${data?.type}`) : <></>}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                         {data?.type === 'name' ? <FormControl>
                              <FormLabel>Full Name</FormLabel>
                              <Input type='text' placeholder={`Input your name`} onChange={(e) => setInput({ ...data, name: e.target.value })} />
                         </FormControl> : data?.type === 'email' ? <FormControl>
                              <FormLabel>Email</FormLabel>
                              <Input type='text' placeholder={`Input your email`} onChange={(e) => setInput({ ...data, email: e.target.value })} />
                         </FormControl> : data?.type === 'password' ? <FormControl>
                              <FormLabel>Password</FormLabel>
                              <InputGroup size='md'>
                                   <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        onChange={(e) => setInput({ ...data, password: e.target.value })}
                                   />
                                   <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                             {show ? 'Hide' : 'Show'}
                                        </Button>
                                   </InputRightElement>
                              </InputGroup>
                         </FormControl> : data?.type === 'photo' ? <FormControl>
                              <FormLabel>Profile Picture</FormLabel>
                              <Input type='file' variant='ghost' onChange={(e) => setInput({ ...data, image: e.target.files[0] })} />
                         </FormControl> : data?.type === 'confirm-delete' ? <Text>Are you sure want to delete this picture?</Text> :
                              data?.type?.includes('alert') ? <Text>You should login first !</Text> :
                                   <></>}

                    </ModalBody>

                    <ModalFooter>
                         {data?.type?.includes('alert') ? <Button colorScheme='green' onClick={() => navigate('/authentication/login')}>Login</Button> : data?.type !== 'confirm-delete' ? <>  <Button colorScheme='red' mr={3} onClick={onClose}>
                              Close
                         </Button>
                              <Button colorScheme='green' onClick={() => handleSave()}>Save</Button></> : <Button colorScheme='red' onClick={() => handleSave()}>Delete</Button>}

                    </ModalFooter>
               </ModalContent>
          </Modal>
     )
}

export default Modals