import blizzard_minter_ABI from "../contracts/blizzard_MINTER.json";
import type { BlizzardMINTER } from "../contracts/types";
import useContract from "./useContract";

export default function useMinter(tokenAddress?: string) {
  return useContract<BlizzardMINTER>("0x03414b0E526A5D6C2E1fC813724448a871598287", blizzard_minter_ABI);
}