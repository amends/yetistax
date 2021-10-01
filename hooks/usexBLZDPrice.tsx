import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import usexBLZDBUSDPair from "./usexBLZDBUSDPair";
import { parseBalance } from "../util";
import { BigNumber } from "ethers";

function getxBLZDPrice(contract: any) {
  return async () => {
    const balance = [] = await contract.getReserves();
    const xBLZDPrice = balance[1] / balance[0];
    return xBLZDPrice.toFixed(3);
    //return cakePrice;
  };
}

export default function usexBLZDPrice(
  suspense = false
) {
  const contract = usexBLZDBUSDPair();

  const shouldFetch = !!contract;

  const POTS = useSWR(
    shouldFetch ? ["getReservess"] : null,
    getxBLZDPrice(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(POTS.mutate);

  return POTS;
}
