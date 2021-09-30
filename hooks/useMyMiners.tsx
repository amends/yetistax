import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useMinter from "./useMinter";

function getMiners(contract: any, address: any) {
  return async (_: string, address: string) => {
    const miners = await contract.blizzardMiners(address);
    return miners.toNumber();
  };
}

export default function useMyMiners(
  address: string,
  suspense = false
) {
  const contract = useMinter();

  const shouldFetch =
    typeof address === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["myMiners", address] : null,
    getMiners(contract, address),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
