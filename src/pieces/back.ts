import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives, geometries } from "@jscad/modeling";

import { Measurements } from "../types/params";
import {
  getArmholeDepth,
  getChestWidth,
  getHipWidth,
  getShoulderPoints,
  HIP_HEIGHT,
} from "./shared";

const { line } = primitives;
const { path2 } = geometries;

export const generateBackBlock = (params: Measurements) => {
  const { bustHeight, waistHeight, hipRound, ease } = params;

  const centerBackNeckPoint: Vec2 = [0, 1];
  const centerBackBustLine: Vec2 = [0, bustHeight];
  const centerBackWaistLine: Vec2 = [0, waistHeight];
  const centerBackHipLine: Vec2 = [0, waistHeight + HIP_HEIGHT];

  const backHipPoint: Vec2 = [getHipWidth(params), centerBackHipLine[1]];

  const [upperShoulderPoint, lowerShoulderPoint] = getShoulderPoints(params);

  const centerBackChestLine: Vec2 = [
    0,
    lowerShoulderPoint[1] + getArmholeDepth(params),
  ];

  const backArmholePoint: Vec2 = [
    getChestWidth(params),
    centerBackChestLine[1],
  ];

  let backOutline = path2.create([
    centerBackNeckPoint,
    centerBackChestLine,
    centerBackBustLine,
    centerBackWaistLine,
    centerBackHipLine,
  ]);

  backOutline = path2.appendPoints([backHipPoint], backOutline);

  backOutline = path2.appendPoints([backArmholePoint], backOutline);

  backOutline = path2.appendPoints(
    [lowerShoulderPoint, upperShoulderPoint],
    backOutline
  );
  backOutline = path2.close(backOutline);

  return {
    backShort: backOutline,
  };
};
