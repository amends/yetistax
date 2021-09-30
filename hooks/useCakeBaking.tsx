import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useMinter from "./useMinter";
import { parseBalance } from "../util";

function getCakeBaking(contract: any) {
  return async (_: string, address: string) => {
    const bal = await contract.getBalance();
    return parseBalance(bal, 18, 0)
  };
}

export default function useCakeBaking(
  suspense = false
) {
  const contract = useMinter();

  const shouldFetch =
    !!contract;

  const result = useSWR(
    shouldFetch ? ["cakeBalance"] : null,
    getCakeBaking(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}