import PancakePairxBLZD_ABI from "../contracts/PancakePairxBLZD.json";
import type { PancakePairxBLZD } from "../contracts/types";
import useContract from "./useContract";

export default function usexBLZDBUSDPair(tokenAddress?: string) {
  return useContract<PancakePairxBLZD>("0xedcd99ad43c6911d37780158370ec1913ee9e7d3", PancakePairxBLZD_ABI);
}
