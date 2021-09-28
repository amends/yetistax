import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useMinter from "./useMinter";
import { parseBalance } from "../util";

function getCountdown(contract: any, address: any) {
  return async (_: string, address: string) => {
    const currentTime = await contract.cakeBake(address);
    const addTime = currentTime.toNumber() + 86400
    const ms = addTime * 1000
    const date = new Date(ms)
    const formattedDate = date.toLocaleString(); 
    return formattedDate;
  };
}

export default function useCountdown(
  address: string,
  suspense = false
) {
  const contract = useMinter();

  const shouldFetch =
    typeof address === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["countdown", address] : null,
    getCountdown(contract, address),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
