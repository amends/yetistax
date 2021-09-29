import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useMinter from "./useMinter";
import { parseBalance } from "../util";
import { BigNumber } from "ethers";

function getBAL(contract: any, address: any) {
  return async (_: string, address: string) => {
    const bal = await contract.getCakeSinceCakeBake(address);
    const sell = await contract.calculateCakeSell(bal);
    return parseBalance(sell, 18, 6)
  };
}

export default function useBAL(
  address: string,
  suspense = false
) {
  const contract = useMinter();

  const shouldFetch =
    typeof address === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["myBAL", address] : null,
    getBAL(contract, address),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}