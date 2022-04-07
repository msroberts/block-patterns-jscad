import { Measurements } from "../types/params";

export const getNeckWidth = ({ bustRound }: Measurements) => {
  return Math.max(bustRound / 16 + 1 / 2, 2.75);
};
