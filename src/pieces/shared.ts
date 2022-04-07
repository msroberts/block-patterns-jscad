import { Vec2 } from "@jscad/modeling/src/maths/types";
import { Measurements } from "../types/params";

export const HIP_HEIGHT = 9;

export const getNeckWidth = ({ bustRound }: Measurements) => {
  return Math.max(bustRound / 8 + 1, 2.75);
};

export const getHipWidth = ({ hipRound, ease }: Measurements) => {
  return (hipRound + (ease * 2) / 3) / 4;
};

export const getShoulderPoints = (params: Measurements) => {
  const { shoulderWidth } = params;

  const neckWidth = getNeckWidth(params);

  const upperShoulderPoint: Vec2 = [neckWidth / 2, 0];
  const shoulderSlopeAngle = Math.atan(1 / 7.5);
  const shoulderLength = (shoulderWidth - neckWidth) / 2;
  const lowerShoulderPoint: Vec2 = [
    shoulderWidth / 2,
    Math.sin(shoulderSlopeAngle) * shoulderLength,
  ];

  return [upperShoulderPoint, lowerShoulderPoint];
};
