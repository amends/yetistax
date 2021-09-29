import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";
import { parseBalance } from "../util";

function getTokenBalance(contract: ERC20) {
  return async (_: string, address: string) => {
    const balance = await contract.balanceOf(address);
    if(Number(balance) < 1000000000000){
      return parseBalance(balance, 18, 6);
    } else {
    const roundedDown = (Number(balance) - 1000000000000)
    return parseBalance(BigInt(roundedDown), 18, 6);
  }};
}

export default function useTokenBalance(
  address: string,
  tokenAddress: string,
  suspense = false
) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    typeof address === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TokenBalance", address, tokenAddress] : null,
    getTokenBalance(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
