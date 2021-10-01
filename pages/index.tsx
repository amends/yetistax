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
  Spinner,
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
import useBAL from "../hooks/useAvailBalance"
import useCountdown from "../hooks/useCountdown";
import useCakeApproval from "../hooks/useCakeApproval";
import useCakeBaking from "../hooks/useCakeBaking";
var isLoading = false;
function Home() {
  
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const [CAKE, setCAKE] = useState('');
  const [miners, setMiners] = useState('');
  const balCAKE = useTokenBalance(account, "0x9a946c3cb16c08334b69ae249690c236ebd5583e")
  const cakeContract = useTokenContract("0x9a946c3cb16c08334b69ae249690c236ebd5583e")
  const miner = useMinter()
  const isConnected = typeof account === "string" && !!library;
  const router = useRouter()
  const myMiners = useMyMiners(account)
  const FPS = useFPS(account)
  const preFeeBAL = useBAL(account)
  const date = useCountdown(account)
  const isCakeApproved = useCakeApproval("0x03414b0E526A5D6C2E1fC813724448a871598287", account);
  const cakeBal = useCakeBaking();
  const BAL = (Number(preFeeBAL.data) * 0.95).toFixed(2)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.href;
      const split = hostname.split("=")
      const ref = split[1]
   }
  })


  async function approveCAKE(amount: any) {
    isLoading = true;
    const approve = await cakeContract.approve("0x03414b0E526A5D6C2E1fC813724448a871598287", amount)
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
    const invest = await miner.investBlizzard(ref, amount)
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
    const compound = await miner.compoundBlizzard(ref)
  }
  async function sellCAKE(){
    const pop = await miner.sellBlizzard()
  }

  return (
    <Box bg="blue.500" minW="100vw" minH="100vh">
    <>
      <Head>
        <title>YetiStax xBLZD Minting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <Center pt={5}>
          <VStack>
          <Button colorScheme="gray"><Account triedToEagerConnect={triedToEagerConnect} /></Button>
          <Heading px={10} size="md" as="a" href="https://cakestax.money" color="white">Looking to bake CAKE? Click here for CakeStax.</Heading>
          <Heading px={10} size="md" as="a" href="https://ziggystax.money" color="white">Looking to mine POTS? Click here for ZiggyStax.</Heading>

          </VStack>
          </Center>
          <SimpleGrid column={5} spacing={5} justifyItems="center">
          <Box borderRadius="30px" mt="2em" boxShadow="lg" bg="white" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <Center>
            <HStack>
            <Img maxW="100px" maxH="100px" p="1em" src="/blizzard.png" />
            <Heading fontSize={{base: "xl", md: "3xl"}} color="gray.500" p={{base: 0, md: 5}}>YetiStax xBLZD Minter</Heading>
            <Img maxW="100px" maxH="100px" p="1em" src="/blizzard.png" />
            </HStack>
          </Center>
          <Center>
            <HStack>
              {isConnected ?<>
            <Text color="gray.500" fontSize={{base: "md", md: "xl"}} p={3}>{cakeBal.data} Total xBLZD being chilled.</Text></> :
             <><Text color="gray.500" p={1}>Please Connect To MetaMask.</Text></>
              }
            </HStack>
          </Center>
            <Center>
            <HStack pb={5}>
            <Badge ml="1" fontSize="1em" colorScheme="green">3% DAILY</Badge>
            <Badge ml="1" fontSize="1em" colorScheme="green">1,095% APR</Badge>
            </HStack>
            </Center>
          </Box>
        
          <Center borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              <Text color="gray.500" p={1}>1. Enter xBLZD Amount Below and Approve Spend</Text>
              <Input onChange={event => setCAKE(event.target.value)} value={CAKE} placeholder="Amount of xBLZD" />
              <HStack>
              {isConnected ? <>
              <Button variant="link" onClick={(e) => setCAKE(balCAKE.data)}>{balCAKE.data}</Button>
              <Text color="gray.500" p={1}>available xBLZD</Text></> :
              <Spinner mb={3} color="blue.500" />
              }
              </HStack>
              {!isCakeApproved.data ? 
              <Button isLoading={isLoading} onClick={() => approveCAKE(ethers.utils.parseEther(CAKE))}colorScheme="blue">Approve xBLZD Spend</Button> :
              <Button isLoading={false} onClick={() => approveCAKE(ethers.utils.parseEther(CAKE))}colorScheme="blue">Approve Additional xBLZD Spend</Button>
              }
            </VStack>
          </Center>
          <Center borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              <Text color="gray.500" p={1}>2. Exchange xBLZD To Hire Yetis. Yetis make more xBLZD!</Text>
              <Input onChange={event => setMiners(event.target.value)} value={miners} placeholder="Amount of xBLZD" />
              <HStack>
              {isConnected ? <>
              <Button variant="link" onClick={(e) => setMiners(balCAKE.data)}>{balCAKE.data}</Button>
              <Text color="gray.500" p={1}>available xBLZD</Text></> :
              <Spinner mb={3} color="blue.500" />
              }
              </HStack>
              <Button onClick={() => investCAKE(ethers.utils.parseEther(miners))} colorScheme="blue">Hire Yetis</Button>
            </VStack>
          </Center>
          <Center borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              {isConnected ? <>
              <Text color="gray.500" fontSize="2xl" fontWeight="semibold">{myMiners.data} Hired Yetis</Text>
              <Text color="gray.500" fontSize="2xl" fontWeight="semibold">{BAL} Chilled xBLZD</Text>
              <Text color="gray.500" fontSize={{base:"lgs", md:"2xl"}} fontWeight="semibold">Your xBLZD will be fully chilled on:<br/> {date.data}</Text></> :
              <Spinner mb={3} color="blue.500" />
              }
            <SimpleGrid columns={{base:1, md:2}} spacing={3}>
            <Button onClick={() => compoundCAKE()} colorScheme="blue">Hire More Yetis</Button>
            <Button onClick={() => sellCAKE()} colorScheme="blue">Pocket Chilled xBLZD</Button>
            </SimpleGrid>
            </VStack>
    
          </Center>
          <Center mb={5} borderRadius="30px" boxShadow="lg" bg="white" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              <Text color="gray.500" fontSize="md" fontWeight="semibold">Use your referral link to earn free yetis!</Text>
              {isConnected ? <>
              <Link href={`https://yetistax.money?ref=${account}`}><Text color="gray.500" fontSize="10px" fontWeight="semibold">https://yetistax.money?ref={account}</Text></Link></> :
              <Spinner mb={3} color="blue.500" />
              }
            </VStack>
    
          </Center>
          </SimpleGrid>
          
       </>
       </Box>
  );
}

export default Home;
