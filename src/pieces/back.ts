import { Vec2 } from "@jscad/modeling/src/maths/types";
import { primitives, geometries } from "@jscad/modeling";

import { Measurements } from "../types/params";
import { getHipWidth, getShoulderPoints, HIP_HEIGHT } from "./shared";

const { line } = primitives;
const { path2 } = geometries;

export const generateBackBlock = (params: Measurements) => {
  const { bustHeight, waistHeight, hipRound, ease } = params;

  const centerBackNeckPoint: Vec2 = [0, 1];
  const centerBackBustLine: Vec2 = [0, bustHeight];
  const centerBackWaistLine: Vec2 = [0, waistHeight];
  const centerBackHipLine: Vec2 = [0, waistHeight + HIP_HEIGHT];

  let backOutline = path2.create([
    centerBackNeckPoint,
    centerBackBustLine,
    centerBackWaistLine,
    centerBackHipLine,
  ]);

  const backHipPoint: Vec2 = [getHipWidth(params), centerBackHipLine[1]];

  backOutline = path2.appendPoints([backHipPoint], backOutline);

  backOutline = path2.appendPoints(
    getShoulderPoints(params).reverse(),
    backOutline
  );
  backOutline = path2.close(backOutline);

  return {
    backShort: backOutline,
  };
};
