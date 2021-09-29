import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";
import { parseBalance } from "../util";

function getCakeApproval(contract: any, account: any, spender: any) {
  return async () => {
    const approval = await contract.allowance(account, spender);
    if (approval != 0){
    return true;
    }
    return false;
  };
}

export default function useCakeApproval(
  spender: any,
  account: any,
  suspense = false
) {
  const contract = useTokenContract("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82");

  const shouldFetch = !!contract;

  const result = useSWR(
    shouldFetch ? ["cakeapproval", spender] : null,
    getCakeApproval(contract, account, spender),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
