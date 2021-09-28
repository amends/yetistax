import cake_minter_ABI from "../contracts/cake_MINTER.json";
import type { CakeMINTER } from "../contracts/types";
import useContract from "./useContract";

export default function useMinter(tokenAddress?: string) {
  return useContract<CakeMINTER>("0xc27732fe1b810985c0bcd3bf9ecd0a5e6614f8a6", cake_minter_ABI);
}