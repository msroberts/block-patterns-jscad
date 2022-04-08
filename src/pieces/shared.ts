import { Vec2 } from "@jscad/modeling/src/maths/types";
import { Measurements } from "../types/params";

export const HIP_HEIGHT = 9;

export const getNeckWidth = ({ bustRound }: Measurements) => {
  return Math.max(bustRound / 8 + 1, 5.5);
};

export const getChestWidth = ({ chestRound, ease }: Measurements) => {
  return (chestRound + ease) / 4;
};

export const getWaistWidth = ({ waistRound, ease }: Measurements) => {
  return (waistRound + ease) / 4 + 1.5;
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

  return { upperShoulderPoint, lowerShoulderPoint, shoulderSlopeAngle };
};

export const getArmholeDepth = ({ armRound, ease }: Measurements) => {
  return armRound / 2 + ease / 4;
};

export const getWaistDartPoints = ({
  shoulderWidth,
  bustHeight,
  waistHeight,
}: Measurements) => {
  const topPoint: Vec2 = [shoulderWidth / 4, bustHeight];
  const innerPoint: Vec2 = [topPoint[0] - 1 / 2, waistHeight];
  const outerPoint: Vec2 = [innerPoint[0] + 1, innerPoint[1]];
  const bottomPoint: Vec2 = [topPoint[0], waistHeight + HIP_HEIGHT];

  return [innerPoint, topPoint, outerPoint, bottomPoint];
};
