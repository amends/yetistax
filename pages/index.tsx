import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import {
  Button,
  SimpleGrid,
  Box,
  Text,
  Heading,
  Img,
  Center,
  HStack,
  VStack,
  Badge,
  Input,
  Link,
} from "@chakra-ui/react"
import { useState } from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import useMinter from "../hooks/useMinter"
import useTokenContract from "../hooks/useTokenContract";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import useMyMiners from "../hooks/useMyMiners";
import useFPS from "../hooks/useFPS";
import useAvailBalance from "../hooks/useAvailBalance"
function Home() {
  
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const [CAKE, setCAKE] = useState('');
  const [miners, setMiners] = useState('');
  const balCAKE = useTokenBalance(account, "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82")
  const cakeContract = useTokenContract("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82")
  const miner = useMinter()
  const isConnected = typeof account === "string" && !!library;
  const router = useRouter()
  const myMiners = useMyMiners(account)
  const FPS = useFPS(account)
  const BAL = useBAL(account)
console.log(myMiners.data)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.href;
      const split = hostname.split("=")
      const ref = split[1]
   }
  })


  async function approveCAKE(amount: any) {
    console.log(amount)
    const approve = await cakeContract.approve("0xc27732fe1b810985c0bcd3bf9ecd0a5e6614f8a6", amount)
  }
  async function investCAKE(amount: any){
    const hostname = window.location.href;
      let ref
      const split = hostname.split("=")
      var data = split[1]
      if(data && data.length > 10){
         ref = data
      } else {
         ref = account
      }
      console.log(ref)
    const invest = await miner.investCake(ref, amount)
  }
  async function compoundCAKE(){
    const hostname = window.location.href;
      let ref
      const split = hostname.split("=")
      var data = split[1]
      if(data && data.length > 10){
         ref = data
      } else {
         ref = account
      }
    const compound = await miner.compoundCake(ref)
  }
  async function sellCAKE(){
    const pop = await miner.sellCake()
  }

  return (
    <Box bg="#89CFF0" minW="100vw" minH="100vh">
    <>
      <Head>
        <title>CakeStax CAKE Minting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <Center pt={5}>
          <Button colorScheme="blue"><Account triedToEagerConnect={triedToEagerConnect} /></Button>
          </Center>
          <SimpleGrid column={4} spacing={5} justifyItems="center" >
          <Box borderRadius="30px" mt="2em" boxShadow="lg" bg="white" alignItems="center" width="90vw">
            <HStack>
            <Img maxW="100px" maxH="100px" p="1em" src="/cake.png" />
            <Heading color="gray.500" p={5}>CakeStax CAKE Minter</Heading>
            
            </HStack>
            <Center>
            <HStack pb={5}>
            <Badge ml="1" fontSize="1em" colorScheme="green">3% DAILY</Badge>
            <Badge ml="1" fontSize="1em" colorScheme="green">1,095% APR</Badge>
            </HStack>
            </Center>
          </Box>
        
          <Center borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width="90vw">
          <VStack p={5}>
              <Text color="gray.500" p={1}>1. Enter CAKE Amount Below and Approve Spend</Text>
              <Input onChange={event => setCAKE(event.target.value)} value={CAKE} placeholder="Amount of CAKE" />
              <HStack>
              <Button variant="link" onClick={(e) => setCAKE(balCAKE.data)}>{balCAKE.data}</Button>
              <Text color="gray.500" p={1}>available CAKE</Text>
              </HStack>
              <Button onClick={() => approveCAKE(ethers.utils.parseEther(CAKE))}colorScheme="blue">Approve CAKE Spend</Button>
            </VStack>
          </Center>
          <Center borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width="90vw">
          <VStack p={5}>
              <Text color="gray.500" p={1}>2. Enter CAKE Amount Below and Hire Miners</Text>
              <Input onChange={event => setMiners(event.target.value)} value={miners} placeholder="Amount of CAKE" />
              <HStack>
              <Button variant="link" onClick={(e) => setMiners(balCAKE.data)}>{balCAKE.data}</Button>
              <Text color="gray.500" p={1}>available CAKE</Text>
              </HStack>
              <Button onClick={() => investCAKE(ethers.utils.parseEther(miners))} colorScheme="blue">Hire Miners</Button>
            </VStack>
          </Center>
          <Center borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width="90vw">
          <VStack p={5}>
              <Text color="gray.500" fontSize="2xl" fontWeight="semibold">{myMiners.data} Miners</Text>
            <!--
              <Text color="gray.500" fontSize="2xl" fontWeight="semibold">{FPS.data} Feet Per Second</Text> --->
              <Text color="gray.500" fontSize="2xl" fontWeight="semibold">{BAL.data} Mined CAKE</Text>
              <Text color="gray.500" fontSize="2xl" fontWeight="semibold">0 Until Full</Text>
              <HStack>
            <Button onClick={() => compoundCAKE()} colorScheme="blue">Hire More Miners</Button>
            <Button onClick={() => sellCAKE()} colorScheme="blue">Pocket CAKE</Button>
            </HStack>
            </VStack>
    
          </Center>
          </SimpleGrid>
          
       </>
       </Box>
  );
}

export default Home;
